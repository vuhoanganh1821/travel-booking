import React, { useEffect } from 'react'
import {
  Button,
  Center,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack
} from '@chakra-ui/react'
import FormInput from 'components/FormInput'
import { tourPriceOptions } from 'constants/common'
import { getValidArray } from 'utils/common'
import { IPriceOption } from 'interfaces/common'
import { toast } from 'react-toastify'
import { updateTourDetail } from 'API/tour'
import Icon from 'components/Icon'
import Dropdown from 'components/Dropdown'

interface IManagePriceOptionsProps {
  isOpen: boolean
  onClose: () => void
  tourId: string
  methods: any
  existingOptions: IPriceOption[]
  setExistingOptions: (options: IPriceOption[]) => void
}

const ManagePriceOptions = (props: IManagePriceOptionsProps) => {
  const { isOpen, onClose, tourId, methods, existingOptions, setExistingOptions } = props
  const { getValues, setValue } = methods
  
  function handleAddNewPriceOption(): void {
    const newTitle = getValues('newPriceOptionTitle.value')
    const newValue = getValues('newPriceOptionValue')
    const currency = getValues('currencyValue.value')
    if (!newTitle || !newValue) {
      toast.error('Please fill in all fields')
      return
    }
    const newOption = { title: newTitle, value: Number(newValue), currency }
    setExistingOptions([...existingOptions, newOption])
    setValue('newPriceOptionTitle', '')
    setValue('newPriceOptionValue', '')
  }

  function handleDeletePriceOption(index: number): void {
    const newOptions = existingOptions.filter((_, i) => i !== index)
    setExistingOptions(newOptions)
  }

  async function onSubmit(): Promise<void> {
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
  }

  useEffect(() => {
    if (isOpen) {
      setValue('newPriceOptionTitle', '')
      setValue('newPriceOptionValue', '')
    }
  }, [isOpen])

  return (
    <Modal size="md" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent top={10} borderRadius={8} marginTop={0}>
        <ModalHeader color="gray.800"fontSize="18px" fontWeight={500} lineHeight={7}>
          Manage Price Options
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody border="1px solid #E2E8F0" padding={6}>
          <VStack width="full" align="flex-start" spacing={4}>
            <Dropdown
              name="newPriceOptionTitle"
              label="Price Option Title"
              options={tourPriceOptions}
              setValue={setValue}
            />
            <FormInput name="newPriceOptionValue" label="Price Option Value" type="number" min={0} />
            <Button width="full" colorScheme="teal" onClick={handleAddNewPriceOption}>
              Add New Price Option
            </Button>
          </VStack>
          <Divider color="gray.300" borderWidth={1} marginY={6} />
          <FormInput name="priceOptions" label="Existing Price Options">
            <VStack width="full" align="flex-start">
              {getValidArray(existingOptions).map((option, index) => (
                <HStack key={option?._id} width="full">
                  <HStack width="full" marginLeft={10}>
                    <Text width="200px" fontWeight={500}>{option?.title}</Text>
                    <Text width="full" fontWeight={500}>{`${option?.value} ${option?.currency}`}</Text>
                  </HStack>
                  <Center minWidth={8} cursor="pointer" marginLeft={2}>
                    <Icon iconName="trash.svg" size={32} onClick={() => handleDeletePriceOption(index)} />
                  </Center>
                </HStack>
              ))}
            </VStack>
          </FormInput>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            lineHeight={6}
            border="1px solid #E2E8F0"
            border-radius="6px"
            paddingY={2}
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ManagePriceOptions
