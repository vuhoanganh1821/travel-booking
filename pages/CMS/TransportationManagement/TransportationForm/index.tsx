import React, { useEffect } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid
} from '@chakra-ui/react'
import { createTransportation, updateTransportation } from 'API/transportation'
import FormInput from 'components/FormInput'
import { useStores } from 'hooks/useStores'
import { ITransportation } from 'interfaces/transportation'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface ITransportationForm extends ITransportation {}

interface ITransportationFormProps {
  isOpen: boolean
  onClose: () => void
  transportation?: ITransportation
}

const TransportationForm = (props: ITransportationFormProps) => {
  const { isOpen, onClose, transportation } = props
  const { transportationStore } = useStores()
  const methods = useForm<ITransportationForm>()
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = methods

  function handleOnClose(): void {
    reset({})
    onClose()
  }

  async function onSubmit(data: ITransportationForm): Promise<void> {
    try {
      if (transportation?._id) {
        await updateTransportation(transportation?._id, data)
      } else {
        await createTransportation(data)
      }
      await transportationStore.fetchAllTransportations()
      handleOnClose()
      toast.success(transportation ? 'Update transportation successfully' : 'Create transportation successfully')
    } catch (error) {
      handleOnClose()
      toast.error(transportation ? 'Update transportation failed' : 'Create transportation failed')
    }
  }

  useEffect(() => {
    if (isOpen && transportation) {
      reset({
        name: transportation?.name,
        brand: transportation?.brand,
        capacity: transportation?.capacity,
        image: transportation?.image
      })
    }
  }, [isOpen])

  return (
    <Modal size="xl" isOpen={isOpen} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent borderRadius={8}>
        <ModalHeader  color="gray.800"fontSize="18px" fontWeight={500} lineHeight={7}>
          {transportation ? 'Edit Transportation' : 'Create New Transportation'}
        </ModalHeader>
        <ModalCloseButton />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody border="1px solid #E2E8F0" padding={6}>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} marginBottom={6}>
                <FormInput name="name" label="Name" placeholder="Enter Name" />
                <FormInput name="brand" label="Brand" placeholder="Enter Brand" />
                <FormInput name="capacity" label="Capacity" placeholder="Enter Capacity" />
                {/* <FormInput name="image" label="Image" placeholder="Enter Image" /> */}
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

export default TransportationForm
