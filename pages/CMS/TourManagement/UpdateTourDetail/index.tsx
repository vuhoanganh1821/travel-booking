'use client'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Box, Button, Center, HStack, Img, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { createTour, updateTourDetail } from 'API/tour'
import { uploadImage, uploadTourImage } from 'API/upload'
import Dropdown, { IOption } from 'components/Dropdown'
import Icon from 'components/Icon'
import FormInput from 'components/FormInput'
import { useStores } from 'hooks/useStores'
import { IPriceOption } from 'interfaces/common'
import { ITour } from 'interfaces/tour'
import get from 'lodash/get'
import { observer } from 'mobx-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import NoImage from 'public/assets/images/no-image.png'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import routes from 'routes'
import { getOptions, getValidArray } from 'utils/common'
import { formatFormData } from '../utils'
import ManageExclusions from './ManageExclusions'
import ManageInclusions from './ManageInclusions'
import ManagePriceOptions from './ManagePriceOptions'
import { ManageText } from './styles'
import { currencyOptions, tourTypeOptions } from 'constants/common'

export interface IUpdateTourForm extends ITour {
  typeValue: IOption
  locationValue: IOption
  categoryValue: IOption
  currencyValue: IOption
}

const UpdateTourDetail = () => {
  const { categoryStore, locationStore, tourStore } = useStores()
  const { tourDetail } = tourStore
  const { locations } = locationStore
  const { categories } = categoryStore
  const router = useRouter()
  const pathname = usePathname()
  const imagesRef = useRef<any>(null)
  const thumbnailRef = useRef<any>(null)
  const tourId = pathname?.split('/').pop() ?? ''
  const isEditMode = tourId !== 'create'
  const methods = useForm<IUpdateTourForm>()
  const { control, handleSubmit, reset, setValue } = methods
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false)
  const [isManageInclusion, setIsManageInclusion] = useState<boolean>(false)
  const [isManageExclusion, setIsManageExclusion] = useState<boolean>(false)
  const [isManagePriceOptions, setIsManagePriceOptions] = useState<boolean>(false)
  const [existingPriceOptions, setExistingPriceOptions] = useState<IPriceOption[]>([])
  const thumbnail = useWatch({ control, name: 'thumbnail' }) ?? ''
  const images = useWatch({ control, name: 'images' }) ?? []
  const locationOptions = getOptions(locations, 'title', '_id')
  const categoryOptions = getOptions(categories, 'name', '_id')

  function backToTourList() {
    router.push(routes.cms.tourManagement.value)
  }

  function deleteImages(url: string) {
    setValue('images', images.filter((image: string) => image !== url))
  }

  async function uploadImages(event: ChangeEvent<HTMLInputElement>) {
    setIsImageLoading(true)
    if (!event.target.files || event.target.files.length === 0) {
      return
    }
    try { 
      const files = event.target.files
      const formData = new FormData()
      for (let i = 0; i < files?.length; i++) {
        formData.append('images', files[i])
      }
      const { imagesURL } = await uploadTourImage(tourId, formData)
      setValue('images', [...images, ...imagesURL])
    } catch (error) {
      setIsImageLoading(false)
      toast.error('Upload images failed')
    } finally {
      setIsImageLoading(false)
    }
  }

  async function uploadThumbnail(event: ChangeEvent<HTMLInputElement>) {
    setIsImageLoading(true)
    if (!event.target.files || event.target.files.length === 0) {
      return
    }
    try { 
      const formData = new FormData()
      formData.append('image', event.target.files[0])
      const imageUrl: string = await uploadImage('tour', formData)
      setValue('thumbnail', imageUrl)
    } catch (error) {
      setIsImageLoading(false)
      toast.error('Upload thumbnail failed')
    } finally {
      setIsImageLoading(false)
    }
  }

  async function onSubmit(formData: IUpdateTourForm) {
    setIsLoading(true)
    const data: ITour = formatFormData(formData, existingPriceOptions)
    try {
      if (isEditMode) {
        await updateTourDetail(tourId, data)
        await tourStore.fetchTourDetail(tourId)
        toast.success('Update tour detail successfully')
      } else {
        const location = getValidArray(locations).find(
          (location) => location?._id === formData?.locationValue?.value
        )
        const startLocation = {
          type: 'Point',
          coordinates: location?.loc?.coordinates ?? [],
          description: location?.title ?? '',
          address: location?.title ?? ''
        }
        await createTour({ ...data, startLocation })
        toast.success('Create new tour successfully')
        backToTourList()
      }
    } catch (error) {
      setIsLoading(false)
      toast.error(isEditMode ? 'Update tour detail failed' : 'Create new tour failed')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (tourId && isEditMode) {
      tourStore.fetchTourDetail(tourId)
    }
    locationStore.fetchAllLocations()
    categoryStore.fetchAllCategories()
  }, [tourId])

  useEffect(() => {
    if (tourDetail?._id && isEditMode) {
      reset({
        ...tourDetail,
        typeValue: {
          label: tourDetail?.type ?? '',
          value: tourDetail?.type ?? ''
        },
        currencyValue: {
          label: tourDetail?.currency ?? '',
          value: tourDetail?.currency ?? ''
        },
        categoryValue: {
          label: get(tourDetail?.category, 'name') ?? '',
          value: get(tourDetail?.category, '_id') ?? ''
        },
        locationValue: {
          label: get(tourDetail?.startLocation, 'title') ?? '',
          value: get(tourDetail?.startLocation, '_id') ?? ''
        }
      })
      const priceOptionsData: IPriceOption[] = getValidArray(tourDetail?.priceOptions).map(option => {
        return {
          _id: option?._id,
          title: option?.title,
          value: Number(option?.value),
          currency: option?.currency
        }
      })
      setExistingPriceOptions(priceOptionsData)
    }
  }, [tourDetail])

  return (
    <Box paddingX={{ base: 6, lg: 8 }} paddingY={6}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HStack width="full" justify="space-between" marginBottom={6}>
            <Text fontSize="lg" fontWeight={600}>
              {isEditMode ? 'Update Tour Detail' : 'Create New Tour'}
            </Text>
            <HStack spacing={4}>
              <Button background="white" borderWidth={1} borderColor="gray.300" isLoading={isLoading} onClick={backToTourList}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="teal" variant="solid" paddingX={4} isLoading={isLoading}>
                Save
              </Button>
            </HStack>
          </HStack>
          <HStack width="full" align="flex-start" spacing={8}>
            <Box width="full" background="white" padding={8} borderRadius={8} borderWidth={1} boxShadow="sm">
              <VStack width="full" align="flex-start" spacing={6}>
                <SimpleGrid width="full" maxWidth="1200px" columns={{ base: 1, md: 2 }} gap={6}>
                  <FormInput name="code" label="Code" />
                  <FormInput name="title" label="Title" />
                  <FormInput name="description" label="Description" gridColumn="span 2"  />
                  <FormInput name="summary" label="Summary" />
                  <Dropdown
                    name="typeValue"
                    label="Type"
                    options={tourTypeOptions}
                    setValue={setValue}
                  />
                  <Dropdown
                    name="currencyValue"
                    label="Currency"
                    options={currencyOptions}
                    setValue={setValue}
                  />
                  <Dropdown
                    name="categoryValue"
                    label="Category"
                    options={categoryOptions}
                    setValue={setValue}
                  />
                  <Dropdown
                    name="locationValue"
                    label="Start Location"
                    options={locationOptions}
                    setValue={setValue}
                  />
                  {/* <FormInput name="interest" label="Interest" /> */}
                  {/* <FormInput name="details" label="Details" /> */}
                  <FormInput name="regularPrice" label="Regular Price"  type="number" min={1} />
                  <FormInput name="discountPrice" label="Discount Price"  type="number" min={1} />
                  <FormInput name="discountPercentage" label="Discount Percentage"  type="number" min={1} />
                  <FormInput name="duration" label="Duration"  type="number" min={0} />
                  <FormInput name="priceOptions" label="Price Options">
                    <ManageText onClick={() => setIsManagePriceOptions(true)}>
                      Manage Price Options
                    </ManageText>
                  </FormInput>
                  <FormInput name="inclusions" label="Inclusions">
                    <ManageText onClick={() => setIsManageInclusion(true)}>
                      Manage Inclusions
                    </ManageText>
                  </FormInput>
                  <FormInput name="exclusions" label="Exclusions">
                    <ManageText onClick={() => setIsManageExclusion(true)}>
                      Manage Exclusions
                    </ManageText>
                  </FormInput>
                </SimpleGrid>
                {isEditMode && (
                  <VStack width="full" align="flex-start" spacing={0}>
                    <Text color="gray.700" fontWeight={500} lineHeight={6} marginBottom={2}>
                      Tour Photo Gallery
                    </Text>
                    <SimpleGrid width="full" columns={{ base: 1, md: 4 }} gap={4}>
                      {getValidArray(images).map((image: string) => (
                        <Center key={image} position="relative">
                          <Button
                            boxSize={10}
                            padding={0}
                            borderRadius="50%"
                            position="absolute"
                            zIndex={9}
                            top={2}
                            right={2}
                            onClick={() => deleteImages(image)}
                          >
                            <Icon iconName="trash.svg" size={32} />
                          </Button>
                          <Img key={image} width="215px" height="130px" src={image} borderRadius={8} />
                        </Center>
                      ))}
                    </SimpleGrid>
                    <Button
                      marginTop={4}
                      background="gray.300"
                      isLoading={isImageLoading}
                      onClick={() => imagesRef?.current?.click()}
                    >
                      Upload Tour Images
                    </Button>
                    <input type="file" ref={imagesRef} onChange={uploadImages} style={{ display: 'none' }} multiple />
                  </VStack>
                )}
              </VStack>
            </Box>
            <VStack 
              width="full" 
              maxWidth={300}
              align="flex-start"
              background="white"
              padding={8}
              borderRadius={8}
              borderWidth={1}
              boxShadow="sm"
              spacing={4}
            >
              <Text color="gray.700" fontWeight={500} lineHeight={6}>
                Thumbnail
              </Text>
              {thumbnail ? (
                <Img width="full" height="180px" src={thumbnail} borderRadius={8} />
              ) : (
                <Image width={300} height={180} alt="thumbnail" src={NoImage} />
              )}
              <Button
                width="full"
                borderWidth={1}
                background="white"
                isLoading={isImageLoading}
                onClick={() => thumbnailRef?.current?.click()}
              >
                Choose Thumbnail
              </Button>
              <input type="file" ref={thumbnailRef} onChange={uploadThumbnail} style={{ display: 'none' }} />
            </VStack>
          </HStack>
          <ManagePriceOptions
            tourId={tourId}
            methods={methods}
            isOpen={isManagePriceOptions}
            onClose={() => setIsManagePriceOptions(false)}
            existingOptions={existingPriceOptions}
            setExistingOptions={setExistingPriceOptions}
          />
          <ManageInclusions methods={methods} isOpen={isManageInclusion} onClose={() => setIsManageInclusion(false)} />
          <ManageExclusions methods={methods} isOpen={isManageExclusion} onClose={() => setIsManageExclusion(false)} />
        </form>
      </FormProvider>
    </Box>
  )
}

export default observer(UpdateTourDetail)
