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
} from '@chakra-ui/react'
import { toast } from 'react-toastify'
import FormInput from 'components/FormInput'
import PasswordField from 'components/PasswordField'
import Icon from 'components/Icon'
import { PLATFORM } from 'enums/common'
import { useStores } from 'hooks/useStores'
import { ILoginForm, ISignUpForm } from 'interfaces/auth'
import get from 'lodash/get'
import { useForm, FormProvider } from 'react-hook-form'
import { FaPray } from 'react-icons/fa'

interface ISignUpModalProps {
    openLoginModal: () => void
    isOpen: boolean
    onClose: () => void
}

const SignUpModal = (props: ISignUpModalProps) => {
  const { isOpen, onClose, openLoginModal } = props
  const { authStore } = useStores()
  const methods = useForm<ISignUpForm>()
  const { handleSubmit } = methods
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(data: ISignUpForm): Promise<void> {
    try {
      setIsLoading(true)
      await authStore.signUp(data)
      setIsLoading(false)
      onClose()
      toast.success('Sign up successfully')
    } catch (error) {
      setIsLoading(false)
      console.error('errorMessage', error)
      const errorMessage: string = get(error, 'data.error.message', 'Sign up failed') || JSON.stringify(error)
    }
  }

  function handleOpenLoginModal() {
    onClose()
    openLoginModal()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Stack spacing={8} py={{ base: 0, sm: 8 }} px={{ base: 4, sm: 10 }}>
          <Stack spacing={6}>
            <Stack spacing={{ base: 2, md: 3 }} textAlign="center">
              <Heading size={{ base: 'xs', md: 'lg' }}>Begin Your Adventure Sign Up!</Heading>
              <Text color="fg.muted">
                {`Already have an account?`} <button onClick={handleOpenLoginModal}>Login</button>
              </Text>
            </Stack>
          </Stack>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box bg={{ base: 'transparent', sm: 'bg.surface' }} borderRadius={{ base: 'none', sm: 'xl' }}>
                <Stack spacing={6}>
                  <Stack spacing="5">
                    <FormInput 
                        name="username" 
                        label="Username" 
                        autoComplete="off"/>
                    <FormInput 
                        name="email" 
                        label="Email"
                        autoComplete="off" />
                    <FormInput
                        type="password"
                        name="password"
                        label="Password" 
                      />
                    <FormInput
                        type="password"
                        name="passwordConfirm"
                        label="Confirm password"/>
                    
                  </Stack>
                  <Stack spacing={6}>
                    <Button type="submit" colorScheme="teal" isLoading={isLoading}>
                      Sign Up
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </form>
          </FormProvider>
        </Stack>
       
      </ModalContent>
    </Modal>
  )
}

export default SignUpModal