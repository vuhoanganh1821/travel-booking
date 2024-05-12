import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import {
  Button,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid
} from '@chakra-ui/react'
import { createHotel, updateHotel } from 'API/hotel'
import { uploadImage } from 'API/upload'
import FormInput from 'components/FormInput'
import { useStores } from 'hooks/useStores'
import { IHotel } from 'interfaces/hotel'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

interface IHotelForm extends IHotel {}

interface IHotelFormProps {
  isOpen: boolean
  onClose: () => void
  hotel?: IHotel
}

const HotelForm = (props: IHotelFormProps) => {
  const { isOpen, onClose, hotel } = props
  const { hotelStore } = useStores()
  const methods = useForm<IHotelForm>()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setValue
  } = methods
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const fileInputRef = useRef<any>(null)
  const thumbnail = useWatch({ control, name: 'thumbnail' }) ?? ''

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
      const imageUrl: string = await uploadImage('hotel', formData)
      setValue('thumbnail', imageUrl)
    } catch (error) {
      setIsUploading(false)
      toast.error('Upload thumbnail failed')
    } finally {
      setIsUploading(false)
    }
  }

  async function onSubmit(data: IHotelForm): Promise<void> {
    try {
      if (hotel?._id) {
        await updateHotel(hotel?._id, data)
      } else {
        await createHotel(data)
      }
      await hotelStore.fetchAllHotels()
      handleOnClose()
      toast.success(hotel ? 'Update hotel successfully' : 'Create hotel successfully')
    } catch (error) {
      handleOnClose()
      toast.error(hotel ? 'Update hotel failed' : 'Create hotel failed')
    }
  }

  useEffect(() => {
    if (isOpen && hotel) {
      reset({
        name: hotel?.name,
        address: hotel?.address,
        thumbnail: hotel?.thumbnail
      })
    } else {
      reset({})
    }
  }, [isOpen, hotel])

  return (
    <Modal size="xl" isOpen={isOpen} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent borderRadius={8}>
        <ModalHeader  color="gray.800"fontSize="18px" fontWeight={500} lineHeight={7}>
          {hotel ? 'Edit Hotel' : 'Create New Hotel'}
        </ModalHeader>
        <ModalCloseButton />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody border="1px solid #E2E8F0" padding={6}>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                <FormInput name="name" label="Name" placeholder="Enter Name" />
                <FormInput name="address" label="Address" placeholder="Enter Address" />
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

export default HotelForm
