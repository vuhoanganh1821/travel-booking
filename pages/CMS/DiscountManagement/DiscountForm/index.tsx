import React, { createElement, forwardRef, useEffect } from 'react'
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
import DateInput from 'components/DateInput'
import Dropdown, { IOption } from 'components/Dropdown'
import FormInput from 'components/FormInput'
import { discountAppliesToOptions, discountTypeOptions } from 'constants/common'
import dayjs from 'dayjs'
import { EDiscountAppliesTo } from 'enums/discount'
import { useStores } from 'hooks/useStores'
import { IDiscount } from 'interfaces/discount'
import { observer } from 'mobx-react'
import DatePicker from 'react-datepicker'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getValidArray } from 'utils/common'

interface IDiscountForm {
  name: string
  code: string
  value: number
  type: string
  minOrder: number
  appliesTo: string
  tours: string[]
  startDate: Date
  endDate: Date
  typeValue: IOption
  appliesToValue: IOption
  tourValue: IOption
}

interface IDiscountFormProps {
  isOpen: boolean
  onClose: () => void
  discountId: string
}

const DiscountForm = (props: IDiscountFormProps) => {
  const { discountStore, tourStore } = useStores()
  const { tours } = tourStore
  const { discountDetail } = discountStore
  const { isOpen, onClose, discountId } = props
  const methods = useForm<IDiscountForm>()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    register,
    reset,
    setValue
  } = methods
  const startDate: Date = dayjs(useWatch({ control, name: 'startDate' }) || new Date()).toDate()
  const endDate: Date = dayjs(useWatch({ control, name: 'endDate' }) || new Date()).toDate()
  const appliesToValue = useWatch({ control, name: 'appliesToValue' })
  const tourOptions = getValidArray(tours).map(tour => ({ label: tour?.title ?? '', value: tour?._id ?? '' }))
  const isSpecific = appliesToValue?.value === EDiscountAppliesTo.SPECIFIC

  function handleOnClose(): void {
    reset()
    onClose()
  }

  async function onSubmit(data: IDiscountForm): Promise<void> {
    const discount = {
      name: data?.name,
      code: data?.code,
      value: data?.value,
      type: data?.typeValue?.value,
      minOrder: data?.minOrder,
      appliesTo: data?.appliesToValue?.value,
      tours: isSpecific ? [data?.tourValue?.value] : undefined,
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
        tourValue: tourOptions.find(option => option?.value === discountDetail?.tours?.[0]),
        typeValue: discountTypeOptions.find(option => option?.value === discountDetail?.type),
        appliesToValue: discountAppliesToOptions.find(option => option?.value === discountDetail?.appliesTo)
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
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                <FormInput name="startDate" label="Start Date">
                  <DatePicker
                    {...register('startDate')}
                    selected={startDate}
                    dateFormat="MM/dd/yyyy"
                    onChange={(date: Date) => setValue('startDate', dayjs(date).toDate(), { shouldDirty: true })}
                    customInput={createElement(forwardRef(DateInput))}
                  />
                </FormInput>
                <FormInput name="endDate" label="End Date">
                  <DatePicker
                    {...register('endDate')}
                    selected={endDate}
                    dateFormat="MM/dd/yyyy"
                    onChange={(date: Date) => setValue('endDate', dayjs(date).toDate(), { shouldDirty: true })}
                    customInput={createElement(forwardRef(DateInput))}
                  />
                </FormInput>
                <FormInput name="code" label="Code" placeholder="Enter Code" />
                <FormInput name="name" label="Name" placeholder="Enter Name" />
                <FormInput name="value" label="Value" placeholder="Enter Value" />
                <Dropdown
                  name="typeValue"
                  label="Type"
                  options={discountTypeOptions}
                  setValue={setValue}
                />
                <FormInput name="minOrder" label="Min Order" placeholder="Enter Min Order" />
                <Dropdown
                  name="appliesToValue"
                  label="Applies To"
                  options={discountAppliesToOptions}
                  setValue={setValue}
                />
                {isSpecific && (
                  <Dropdown
                    name="tourValue"
                    label="Applies To Tour"
                    gridColumn="span 2"
                    options={tourOptions}
                    setValue={setValue}
                  />
                )}
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

export default observer(DiscountForm)
