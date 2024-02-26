import { Input, InputProps } from '@chakra-ui/react'

interface TextFieldProps extends InputProps {
  isOpen?: boolean
  targetHover?: boolean

  type?: 'text' | 'email' | 'password' | 'textarea' | 'number'
  error?: boolean

  name?: string
}

const TextField = (props: TextFieldProps) => {
  const { error = false, type = 'text', ...rest } = props

  return (
    <Input
      type={type}
      colorScheme="white"
      color="gray.700"
      background="white"
      fontSize="0.9rem"
      {...rest}
    />
  )
}
export default TextField
