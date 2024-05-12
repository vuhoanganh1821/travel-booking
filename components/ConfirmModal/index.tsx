import { ReactNode, useState } from 'react'
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Modal
} from '@chakra-ui/react'
import { toast } from 'react-toastify'

interface IConfirmModalProps {
  titleText?: string
  bodyText?: string | ReactNode
  cancelButtonText?: string
  confirmButtonText?: string
  isOpen: boolean
  onClose: () => void
  onClickAccept: () => void
}

const ConfirmModal = (props: IConfirmModalProps) => {
  const {
    titleText = 'Confirm Changes',
    bodyText = 'Are you sure you want to do this?',
    cancelButtonText = 'Cancel',
    confirmButtonText = 'Confirm',
    isOpen,
    onClose,
    onClickAccept
  } = props
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onsubmit(): Promise<void> {
    try {
      setIsLoading(true)
      await onClickAccept()
      setIsLoading(false)
      onClose()
    } catch (error) {
      onClose()
      setIsLoading(false)
      toast.error('Something wrong happened')
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="gray.800" fontSize="lg" lineHeight={7} fontWeight={700}>
          {titleText}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{bodyText}</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            color="gray.700"
            lineHeight={6}
            border="1px solid #E2E8F0"
            borderRadius="6px"
            background="gray.200"
            _hover={{ background: 'gray.300' }}
            _active={{ background: 'gray.400' }}
            marginRight={4}
            paddingY={2}
            onClick={onClose}
            isLoading={isLoading}
          >
            {cancelButtonText}
          </Button>
          <Button
            borderRadius="6px"
            lineHeight={6}
            colorScheme="teal"
            paddingY={2}
            onClick={onsubmit}
            isLoading={isLoading}
            backgroundColor={confirmButtonText?.includes('delete') ? 'red.600' : 'teal.500' }
            _hover={{ background: confirmButtonText?.includes('delete') ? 'red.700' : 'teal.600' }}
            _active={{ background: confirmButtonText?.includes('delete') ? 'red.800' : 'teal.700' }}
          >
            {confirmButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmModal
