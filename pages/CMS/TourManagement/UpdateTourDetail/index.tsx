'use client'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Box, Button, HStack, Img, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { createTour, updateTourDetail } from 'API/tour'
import { uploadTourImage } from 'API/upload'
import FormInput from 'components/FormInput'
import { useStores } from 'hooks/useStores'
import { ITour } from 'interfaces/tour'
import { observer } from 'mobx-react'
import { usePathname, useRouter } from 'next/navigation'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import routes from 'routes'
import { getValidArray } from 'utils/common'
import { formatFormData } from '../utils'

export interface IUpdateTourForm extends ITour {}

const UpdateTourDetail = () => {
  const { tourStore } = useStores()
  const { tourDetail } = tourStore
  const router = useRouter()
  const pathname = usePathname()
  const fileInputRef = useRef<any>(null)
  const tourId = pathname?.split('/').pop() ?? ''
  const isEditMode = tourId !== 'create'
  const methods = useForm<IUpdateTourForm>()
  const { control, handleSubmit, reset, setValue } = methods
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false)
  const thumbnail = useWatch({ control, name: 'thumbnail' })
  const images = useWatch({ control, name: 'images' })

  function backToTourList() {
    router.push(routes.cms.tourManagement.value)
  }

  async function uploadThumbnail(event: ChangeEvent<HTMLInputElement>) {
    setIsImageLoading(true)
    if (!event.target.files || event.target.files.length === 0) {
      return
    }
    try { 
      const formData = new FormData()
      formData.append('thumbnail', event.target.files[0])
      const { thumbnailURL } = await uploadTourImage(tourId, formData)
      setValue('thumbnail', thumbnailURL)
    } catch (error) {
      setIsImageLoading(false)
      toast.error('Upload failed')
    } finally {
      setIsImageLoading(false)
    }
  }

  async function onSubmit(formData: IUpdateTourForm) {
    setIsLoading(true)
    const data: ITour = formatFormData(formData)
    try {
      if (isEditMode) {
        await updateTourDetail(tourId, data)
        await tourStore.fetchTourDetail(tourId)
        toast.success('Update tour detail successfully')
      } else {
        await createTour(data)
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
      console.log('isEditMode', isEditMode)
      tourStore.fetchTourDetail(tourId)
    }
  }, [tourId])

  useEffect(() => {
    if (tourDetail?._id && isEditMode) {
      reset({
        title: tourDetail?.title,
        code: tourDetail?.code,
        images: tourDetail?.images,
        thumbnail: tourDetail?.thumbnail,
        regularPrice: tourDetail?.regularPrice,
      })
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
              <Button background="white" borderWidth={1} isLoading={isLoading} onClick={backToTourList}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="teal" variant="solid" paddingX={4} isLoading={isLoading}>
                Save
              </Button>
            </HStack>
          </HStack>
          <Box background="white" padding={8} borderRadius={8} borderWidth={1} boxShadow="sm">
            <VStack width="full" align="flex-start" spacing={6}>
              <SimpleGrid width="full" maxWidth="1200px" columns={{ base: 1, md: 2 }} gap={6}>
                <FormInput name="code" label="Code" />
                <FormInput name="title" label="Title" />
                <FormInput name="regularPrice" label="Regular Price" />
              </SimpleGrid>
              <VStack width="full" align="flex-start" spacing={0}>
                <Text color="gray.700" fontWeight={500} lineHeight={6} marginBottom={2}>
                  Tour Photo Gallery
                </Text>
                {getValidArray(images).map((image: string) => (
                  <Img key={image} width="215px" height="130px" src={image} borderRadius={8} />
                ))}
              </VStack>
              <VStack width="full" align="flex-start" spacing={0}>
                <Text color="gray.700" fontWeight={500} lineHeight={6} marginBottom={2}>
                  Tour Thumbnail
                </Text>
                {thumbnail && (
                  <Img width="300px" height="200px" src={thumbnail} borderRadius={8} marginBottom={4} />
                )}
                <Button
                  background="white"
                  borderWidth={1}
                  isLoading={isImageLoading}
                  onClick={() => fileInputRef?.current?.click()}
                >
                  Choose Another Thumbnail
                </Button>
                <input type="file" ref={fileInputRef} onChange={uploadThumbnail} style={{ display: 'none' }} />
              </VStack>
            </VStack>
          </Box>
        </form>
      </FormProvider>
    </Box>
  )
}

export default observer(UpdateTourDetail)
