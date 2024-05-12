import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  SimpleGrid
} from '@chakra-ui/react'
import { createLocation, updateLocation } from 'API/location'
import { uploadImage } from 'API/upload'
import FormInput from 'components/FormInput'
import { ELocationType } from 'enums/location'
import { useStores } from 'hooks/useStores'
import { ILocation } from 'interfaces/location'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

interface ILocationForm extends ILocation {
  latitude: number
  longitude: number
}

interface ILocationFormProps {
  isOpen: boolean
  onClose: () => void
  location?: ILocation
}

const LocationForm = (props: ILocationFormProps) => {
  const { isOpen, onClose, location } = props
  const { locationStore } = useStores()
  const fileInputRef = useRef<any>(null)
  const methods = useForm<ILocationForm>()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    register,
    reset,
    setValue
  } = methods
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const type: string = useWatch({ control, name: 'type' }) ?? ''
  const thumbnail: string = useWatch({ control, name: 'thumbnail' }) ?? ''

  function handleOnClose(): void {
    reset({})
    onClose()
  }

  async function handleUploadImage(event: ChangeEvent<HTMLInputElement>) {
    setIsUploading(true)
    if (!event.target.files || event.target.files.length === 0) {
      return
    }
    try { 
      const formData = new FormData()
      formData.append('image', event.target.files[0])
      const imageUrl: string = await uploadImage('location', formData)
      setValue('thumbnail', imageUrl)
    } catch (error) {
      setIsUploading(false)
      toast.error('Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  async function onSubmit(form: ILocationForm): Promise<void> {
    const data = {
      title: form?.title,
      type: form?.type,
      thumbnail: form?.thumbnail,
      loc: {
        type: 'Point',
        coordinates: [Number(form?.longitude), Number(form?.latitude)]
      }
    }
    try {
      if (location?._id) {
        await updateLocation(location?._id, data)
      } else {
        await createLocation(data)
      }
      await locationStore.fetchAllLocations()
      handleOnClose()
      toast.success(location ? 'Update location successfully' : 'Create location successfully')
    } catch (error) {
      handleOnClose()
      toast.error(location ? 'Update location failed' : 'Create location failed')
    }
  }

  useEffect(() => {
    if (isOpen && location) {
      reset({
        title: location?.title,
        type: location?.type,
        loc: location?.loc,
        thumbnail: location?.thumbnail,
        longitude: location?.loc?.coordinates[0],
        latitude: location?.loc?.coordinates[1],
      })
    } else {
      reset({})
    }
  }, [isOpen])

  return (
    <Modal size="xl" isOpen={isOpen} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent borderRadius={8}>
        <ModalHeader  color="gray.800"fontSize="18px" fontWeight={500} lineHeight={7}>
          {location ? 'Edit Location' : 'Create New Location'}
        </ModalHeader>
        <ModalCloseButton />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody border="1px solid #E2E8F0" padding={6}>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                <FormInput name="title" label="Title" placeholder="Enter Title" />
                <FormControl id="type" marginBottom={6}>
                  <FormLabel marginBottom={4} color="gray.700">
                    Type
                  </FormLabel>
                  <RadioGroup defaultValue={type}>
                    <HStack spacing={2} flexDirection="row" gap="42px">
                      <Radio colorScheme="teal" {...register('type')} value={ELocationType.CITY}>
                        City
                      </Radio>
                      <Radio colorScheme="teal" {...register('type')} value={ELocationType.POINT}>
                        Point
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
                <FormInput name="latitude" label="Latitude" placeholder="Enter Latitude" type="number" />
                <FormInput name="longitude" label="Longitude" placeholder="Enter Longitude" type="number" />
                <FormInput name="thumbnail" label="Thumbnail">
                  {thumbnail && (
                    <Img width="full" height="180px" src={thumbnail} borderRadius={8} marginBottom={4} />
                  )}
                  <Button
                    width="full"
                    background="white"
                    borderWidth={1}
                    isLoading={isUploading}
                    onClick={() => fileInputRef?.current?.click()}
                  >
                    Change Image
                  </Button>
                  <input type="file" ref={fileInputRef} onChange={handleUploadImage} style={{ display: 'none' }} />
                </FormInput>
              </SimpleGrid>
            </ModalBody>
            <ModalFooter>
              <Button
                color="gray.700"
                background="white"
                lineHeight={6}
                border="1px solid #E2E8F0"
                border-radius="6px"
                paddingY={2}
                marginRight={4}
                onClick={handleOnClose}
                isLoading={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                colorScheme="teal"
                border-radius="6px"
                lineHeight={6}
                paddingY={2}
                isLoading={isSubmitting}
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  )
}

export default LocationForm
