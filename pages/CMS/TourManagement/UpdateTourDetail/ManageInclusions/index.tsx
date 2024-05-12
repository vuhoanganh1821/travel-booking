import {
  Center,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack
} from '@chakra-ui/react'
import FormInput from 'components/FormInput'
import Icon from 'components/Icon'
import { useFieldArray } from 'react-hook-form'
import { getValidArray } from 'utils/common'
import { ManageText } from '../styles'

interface IManageInclusionsProps {
  isOpen: boolean
  onClose: () => void
  methods: any
}

const ManageInclusions = (props: IManageInclusionsProps) => {
  const { isOpen, onClose, methods } = props
  const { control, register } = methods
  const { fields, append, remove } = useFieldArray({ control, name: 'inclusions' })

  return (
    <Modal size="md" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent top={10} borderRadius={8} marginTop={0}>
        <ModalHeader color="gray.800"fontSize="18px" fontWeight={500} lineHeight={7}>
          Manage Inclusions
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody border="1px solid #E2E8F0" borderRadius={8} padding={6}>
          <FormInput name="inclusions" label="Inclusions">
            <VStack width="full" align="flex-start">
              {getValidArray(fields).map((field, index) => (
                <InputGroup key={index}>
                  <Input {...register(`inclusions.${index}`)} />
                  <Center minWidth={8} cursor="pointer" marginLeft={2}>
                    <Icon iconName="trash.svg" size={32} onClick={() => remove(index)} />
                  </Center>
                </InputGroup>
              ))}
            </VStack>
          </FormInput>
          <ManageText marginTop={8} onClick={() => append('')}>
            Add New Inclusion
          </ManageText>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ManageInclusions
