import React, { useEffect, useState } from 'react'
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
import { createDiscount, updateDiscount } from 'API/discount'
import FormInput from 'components/FormInput'
import dayjs from 'dayjs'
import { useStores } from 'hooks/useStores'
import { IDiscount } from 'interfaces/discount'
import { observer } from 'mobx-react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

interface IDiscountForm {
  name: string
  code: string
  value: number
  type: string
  minOrder: number
  appliesTo: string
  startDate: string
  endDate: string
}

interface IDiscountFormProps {
  isOpen: boolean
  onClose: () => void
  discountId: string
}

const DiscountForm = (props: IDiscountFormProps) => {
  const { discountStore } = useStores()
  const { discountDetail } = discountStore
  const { isOpen, onClose, discountId } = props
  const methods = useForm<IDiscountForm>()
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = methods

  function handleOnClose(): void {
    reset()
    onClose()
  }

  async function onSubmit(data: IDiscountForm): Promise<void> {
    console.log(data)
    console.log(dayjs(data?.startDate).format('MM/DD/YYYY'))
    const discount = {
      name: data?.name,
      code: data?.code,
      value: data?.value,
      type: data?.type,
      minOrder: data?.minOrder,
      appliesTo: data?.appliesTo,
      startDate: dayjs(data?.startDate).toDate(),
      endDate: dayjs(data?.endDate).toDate(),
    }
    try {
      if (discountId) {
        await updateDiscount(discountId, discount)
      } else {
        await createDiscount(discount)
      }
      await discountStore.fetchAllDiscounts()
      onClose()
      toast.success('Update discount successfully')
    } catch (error) {
      onClose()
      toast.error('Update discount failed')
    }
  }

  useEffect(() => {
    if (isOpen && discountId) {
      reset({
        ...discountDetail,
        startDate: dayjs(discountDetail?.startDate).format('DD/MM/YYYY'),
        endDate: dayjs(discountDetail?.endDate).format('DD/MM/YYYY'),
      })
    } else {
      reset({})
    }
  }, [isOpen, discountDetail])

  useEffect(() => {
    if (discountId) {
      discountStore.fetchDiscountDetail(discountId)
    }
  }, [discountId])

  return (
    <Modal size="xl" isOpen={isOpen} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent borderRadius={8}>
        <ModalHeader  color="gray.800"fontSize="18px" fontWeight={500} lineHeight={7}>
          {discountId ? 'Update Discount Detail' : 'Create New Discount'}
        </ModalHeader>
        <ModalCloseButton />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody border="1px solid #E2E8F0" padding={6}>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} marginBottom={6}>
                <FormInput name="code" label="Code" placeholder="Enter Code" />
                <FormInput name="name" label="Name" placeholder="Enter Name" />
                <FormInput name="value" label="Value" placeholder="Enter Value" />
                <FormInput name="type" label="Type" placeholder="Enter Type" />
                <FormInput name="minOrder" label="Min Order" placeholder="Enter Min Order" />
                <FormInput name="appliesTo" label="Applies To" placeholder="Enter Applies To" />
                <FormInput name="startDate" label="Start Date" placeholder="MM/DD/YYYY" />
                <FormInput name="endDate" label="End Date" placeholder="MM/DD/YYYY" />
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

export default observer(DiscountForm)
