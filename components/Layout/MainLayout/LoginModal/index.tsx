'use client'
import { useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  Stack,
  Text,
} from '@chakra-ui/react'
import FormInput from 'components/FormInput'
import PasswordField from 'components/PasswordField'
import Icon from 'components/Icon'
import { PLATFORM } from 'enums/common'
import { useStores } from 'hooks/useStores'
import { ILoginForm } from 'interfaces/auth'
import get from 'lodash/get'
import { useForm, FormProvider } from 'react-hook-form'
import { toast } from 'react-toastify'

interface ILoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const LoginModal = (props: ILoginModalProps) => {
  const { isOpen, onClose } = props
  const { authStore } = useStores()
  const methods = useForm<ILoginForm>()
  const { handleSubmit, register } = methods
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(data: ILoginForm): Promise<void> {
    try {
      setIsLoading(true)
      await authStore.login({ ...data, isRemember: true}, PLATFORM.WEBSITE)
      setIsLoading(false)
      onClose()
      toast.success('Login successfully')
    } catch (error) {
      setIsLoading(false)
      console.error('errorMessage', error)
      const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
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
              <Heading size={{ base: 'xs', md: 'lg' }}>Log in to your account</Heading>
              <Text color="fg.muted">
                {`Don't have an account?`} <Link href="#">Sign up</Link>
              </Text>
            </Stack>
          </Stack>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box bg={{ base: 'transparent', sm: 'bg.surface' }} borderRadius={{ base: 'none', sm: 'xl' }}>
                <Stack spacing={6}>
                  <Stack spacing="5">
                    <FormInput name="email" label="Email" autoComplete="off" />
                    <PasswordField />
                  </Stack>
                  <HStack justify="space-between">
                    <Checkbox defaultChecked>
                      Remember me
                    </Checkbox>
                    <Button variant="text" size="sm">
                      Forgot password?
                    </Button>
                  </HStack>
                  <Stack spacing={6}>
                    <Button type="submit" colorScheme="blue" isLoading={isLoading}>
                      Sign in
                    </Button>
                    <HStack>
                      <Divider borderColor="gray.300" />
                      <Text fontSize="sm" whiteSpace="nowrap" color="fg.muted">
                        OR
                      </Text>
                      <Divider borderColor="gray.300" />
                    </HStack>
                    <Button
                      fontSize="sm"
                      fontWeight={500}
                      background="none"
                      border="1px solid #CBD5E0"
                    >
                      <Icon iconName="google.svg" size={20} />
                      <Text marginLeft={2} color="gray.700" lineHeight={6}>
                        Continue with Google
                      </Text>
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

export default LoginModal
