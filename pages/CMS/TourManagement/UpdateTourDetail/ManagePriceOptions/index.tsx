import React, { useEffect, useState } from 'react'
import {
  Button,
  Center,
  Divider,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack
} from '@chakra-ui/react'
import FormInput from 'components/FormInput'
import { IUser } from 'interfaces/user'
import { useWatch } from 'react-hook-form'
import { getValidArray } from 'utils/common'
import { IPriceOption } from 'interfaces/common'
import { toast } from 'react-toastify'
import { updateTourDetail } from 'API/tour'
import Icon from 'components/Icon'

interface IManagePriceOptionsProps {
  isOpen: boolean
  onClose: () => void
  tourId: string
  methods: any
}

const ManagePriceOptions = (props: IManagePriceOptionsProps) => {
  const { isOpen, onClose, tourId, methods } = props
  const {
    register,
    control,
    getValues,
    reset,
    setValue
  } = methods
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [existingOptions, setExistingOptions] = useState<IPriceOption[]>([])
  const priceOptions: IPriceOption[] = useWatch({ control, name: 'priceOptions' })

  function handleOnClose(): void {
    reset()
    onClose()
  }
  
  function handleAddNewPriceOption(): void {
    const newTitle = getValues('newPriceOptionTitle')
    const newValue = getValues('newPriceOptionValue')
    const currency = getValues('currency')
    if (!newTitle || !newValue) {
      toast.error('Please fill in all fields')
      return
    }
    setExistingOptions([...existingOptions, { title: newTitle, value: Number(newValue), currency }])
    setValue('priceOptions', [...priceOptions, { title: newTitle, value: Number(newValue), currency }])
    setValue('newPriceOptionTitle', '')
    setValue('newPriceOptionValue', '')
  }

  function handleDeletePriceOption(index: number): void {
    const newOptions = existingOptions.filter((_, i) => i !== index)
    setExistingOptions(newOptions)
    setValue('priceOptions', newOptions)
  }

  async function onSubmit(): Promise<void> {
    setIsSubmitting(true)
    const data: IPriceOption[] = getValues('priceOptions')
    const priceOptionsData: IPriceOption[] = getValidArray(data).map(option => {
      return {
        title: option?.title,
        value: Number(option?.value),
        currency: option?.currency
      }
    })
    await updateTourDetail(tourId, { priceOptions: priceOptionsData })
    onClose()
    setIsSubmitting(false)
  }

  useEffect(() => {
    if (isOpen) {
      setExistingOptions(priceOptions)
      setValue('newPriceOptionTitle', '')
      setValue('newPriceOptionValue', '')
    }
  }, [isOpen])

  return (
    <Modal size="md" isOpen={isOpen} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent top={10} borderRadius={8} marginTop={0}>
        <ModalHeader color="gray.800"fontSize="18px" fontWeight={500} lineHeight={7}>
          Manage Price Options
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody border="1px solid #E2E8F0" padding={6}>
          <VStack width="full" align="flex-start" spacing={4}>
            <FormInput name="newPriceOptionTitle" label="Price Option Title" />
            <FormInput name="newPriceOptionValue" label="Price Option Value" type="number" min={0} />
            <Button width="full" colorScheme="teal" onClick={handleAddNewPriceOption}>
              Add New Price Option
            </Button>
          </VStack>
          <Divider color="gray.300" borderWidth={1} marginY={6} />
          <FormInput name="priceOptions" label="Existing Price Options">
            <VStack width="full" align="flex-start">
              {getValidArray(existingOptions).map((option, index) => (
                <InputGroup key={option?._id}>
                  <InputLeftAddon width="100px">{option?.title}</InputLeftAddon>
                  <Input {...register(`priceOptions.${index}.value`)} />
                  <InputRightAddon>{option?.currency}</InputRightAddon>
                  <Center minWidth={8} cursor="pointer" marginLeft={2}>
                    <Icon iconName="trash.svg" size={32} onClick={() => handleDeletePriceOption(index)} />
                  </Center>
                </InputGroup>
              ))}
            </VStack>
          </FormInput>
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
            isLoading={isSubmitting}
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
            onClick={onSubmit}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ManagePriceOptions
