'use client'
import { useRef } from 'react'
import { FormControl, FormLabel, IconButton, Input, InputGroup, InputRightElement, useDisclosure, } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

const PasswordField = () => {
  const { isOpen, onToggle } = useDisclosure()
  const inputRef = useRef<HTMLInputElement>(null)

  function onClickReveal(): void {
    onToggle()
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }

  return (
    <FormControl>
      <FormLabel htmlFor="password">Password</FormLabel>
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
          name="password"
          type={isOpen ? 'text' : 'password'}
          autoComplete="current-password"
          required
        />
      </InputGroup>
    </FormControl>
  )
}

export default PasswordField
