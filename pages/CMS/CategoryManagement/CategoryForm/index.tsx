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
import { createCategory, updateCategory } from 'API/category'
import FormInput from 'components/FormInput'
import { useStores } from 'hooks/useStores'
import { ICategory } from 'interfaces/category'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface ICategoryForm extends ICategory {}

interface ICategoryFormProps {
  isOpen: boolean
  onClose: () => void
  category?: ICategory
}

const CategoryForm = (props: ICategoryFormProps) => {
  const { isOpen, onClose, category } = props
  const { categoryStore } = useStores()
  const methods = useForm<ICategoryForm>()
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = methods

  function handleOnClose(): void {
    reset({})
    onClose()
  }

  async function onSubmit(data: ICategoryForm): Promise<void> {
    try {
      if (category?._id) {
        await updateCategory(category?._id, data)
      } else {
        await createCategory(data)
      }
      await categoryStore.fetchAllCategories()
      handleOnClose()
      toast.success(category ? 'Update category successfully' : 'Create category successfully')
    } catch (error) {
      handleOnClose()
      toast.error(category ? 'Update category failed' : 'Create category failed')
    }
  }

  useEffect(() => {
    if (isOpen && category) {
      reset({
        name: category?.name,
        icon: category?.icon,
        image: category?.image
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
          {category ? 'Edit Category' : 'Create New Category'}
        </ModalHeader>
        <ModalCloseButton />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody border="1px solid #E2E8F0" padding={6}>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                <FormInput name="name" label="Name" placeholder="Enter Name" />
                <FormInput name="icon" label="Icon" placeholder="Enter Icon" />
                <FormInput name="image" label="Image" placeholder="Enter Image" />
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

export default CategoryForm
