'use client'
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
import PasswordField from 'components/PasswordField'
import Icon from 'components/Icon'
import { useStores } from 'hooks/useStores'

interface ILoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const LoginModal = (props: ILoginModalProps) => {
  const { isOpen, onClose } = props
  const { authStore } = useStores()

  function handleLogin() {
    authStore.login()
    onClose()
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
          <Box bg={{ base: 'transparent', sm: 'bg.surface' }} borderRadius={{ base: 'none', sm: 'xl' }}>
            <Stack spacing={6}>
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" type="email" />
                </FormControl>
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
                <Button colorScheme="blue" onClick={handleLogin}>
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
        </Stack>
      </ModalContent>
    </Modal>
  )
}

export default LoginModal
