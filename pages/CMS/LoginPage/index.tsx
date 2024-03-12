'use client'
import { useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import Icon from 'components/Icon'
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
  const { handleSubmit } = methods
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
    <Container maxW="lg" py={{ base: 12, md: 24 }} px={{ base: 0, sm: 8 }}>
      <Stack spacing={8}>
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
                  <Button type="submit" colorScheme="teal" isLoading={isLoading}>
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
    </Container>
  )
}

export default observer(LoginPage)