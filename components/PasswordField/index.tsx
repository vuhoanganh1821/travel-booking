'use client'
import { useRef } from 'react'
import { FormControl, FormLabel, IconButton, Input, InputGroup, InputRightElement, useDisclosure, } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useFormContext } from 'react-hook-form'

interface IPasswordField {
  label?: string
}

const PasswordField = (props: IPasswordField) => {
  const {label} = props
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);
  const { register } = useFormContext();

  function onClickReveal(): void {
    onToggle()
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }

  return (
    <FormControl>
      <FormLabel htmlFor="Password">{label ?? 'Password'}</FormLabel>
      <InputGroup>
        <InputRightElement>
          <IconButton
            variant="text"
            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
            icon={isOpen ? <ViewOffIcon /> : <ViewIcon />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Input
          id="password"
          type={isOpen ? 'text' : 'password'}
          autoComplete="current-password"
          required
          {...register("password", { required: "Password is required" })} 
        />
      </InputGroup>
    </FormControl>
  )
}

export default PasswordField
