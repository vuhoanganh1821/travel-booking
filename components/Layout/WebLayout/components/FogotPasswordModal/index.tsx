'use client'
import { useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Heading,
  HStack,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  Stack,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react'
import { toast } from 'react-toastify'
import { useStores } from 'hooks/useStores'
import get from 'lodash/get'
import { useForm, FieldValues } from 'react-hook-form'


interface IForgotPassModalProps {
    isOpen: boolean
    onClose: () => void
}

const ForgotPasswordModal = (props: IForgotPassModalProps) => {
  const { isOpen, onClose } = props
  const { authStore } = useStores()
  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(data: FieldValues): Promise<void> {
    try {
      setIsLoading(true)
      await authStore.fogotPassword(data.email)
      setIsLoading(false)
      onClose()
      toast.success('An email has been sent to you, please check your email to reset password')
    } catch (error) {
      setIsLoading(false)
      console.error('errorMessage', error)
      const errorMessage: string = get(error, 'data.error.message', 'Email send failed') || JSON.stringify(error)
      toast.error(errorMessage)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Stack spacing={8} py={{ base: 0, sm: 8 }} px={{ base: 4, sm: 10 }}>
          <Stack spacing={6}>
            <Stack spacing={{ base: 2, md: 3 }} textAlign="center">
              <Heading size={{ base: 'xs', md: 'lg' }}>Reset password</Heading>
            </Stack>
          </Stack>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.name}>
                    <FormLabel htmlFor='name'>Email</FormLabel>
                    <Input
                    id='email'
                    placeholder='Email'
                    {...register('email', {
                        required: 'This is required',
                    })}
                    />
                    <FormErrorMessage>
                    {errors.name && typeof errors.name.message === 'string' && errors.name.message}
                    </FormErrorMessage>
                </FormControl>
                <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                    Reset password
                </Button>
                </form>
        </Stack>
      </ModalContent>
    </Modal>
  )
}

export default ForgotPasswordModal