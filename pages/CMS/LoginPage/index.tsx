'use client'
import { useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import FormInput from 'components/FormInput'
import PasswordField from 'components/PasswordField'
import { PLATFORM } from 'enums/common'
import { useStores } from 'hooks/useStores'
import { ILoginForm } from 'interfaces/auth'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { toast } from 'react-toastify'
import routes from 'routes'
import { observer } from 'mobx-react'

const LoginPage = () => {
  const { authStore } = useStores()
  const methods = useForm<ILoginForm>()
  const { handleSubmit, register } = methods
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(data: ILoginForm): Promise<void> {
    try {
      setIsLoading(true)
      await authStore.login(data, PLATFORM.CMS)
      setIsLoading(false)
      toast.success('Login successfully')
      router.push(routes.cms.bookingManagement.value)
    } catch (error) {
      setIsLoading(false)
      toast.error('Login failed')
    }
  }

  return (
    <Box width="100vw" margin={0}>
      <HStack width="100vw">
        <VStack width="1200px" height="100vh" justify="center" background="teal.400" padding={16} spacing={8}>
          <Heading size={{ base: 'xs', md: 'xl' }} color="white">
            Welcome Back!
          </Heading>
          <Text color="white" textAlign="center">
            Welcome back! We are so happy to have you here. It's great to see you again. We hope you had a safe and enjoyable time away.
          </Text>
        </VStack>
        <Stack width="70%" marginX="250px" spacing={8}>
          <Stack spacing={6}>
            <Stack spacing={{ base: 2, md: 3 }} textAlign="center">
              <Heading size={{ base: 'xs', md: 'lg' }}>Login</Heading>
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
                    <Checkbox defaultChecked {...register('isRemember')}>
                      Remember me
                    </Checkbox>
                    <Button variant="text" size="sm">
                      Forgot password?
                    </Button>
                  </HStack>
                  <Stack spacing={6}>
                    <Button type="submit" colorScheme="teal" isLoading={isLoading}>
                      Login
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </form>
          </FormProvider>
        </Stack>
      </HStack>
    </Box>
  )
}

export default observer(LoginPage)