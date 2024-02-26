'use client'

import { Fragment } from 'react'
import * as React from 'react'
import { Search2Icon } from '@chakra-ui/icons'
import { InputGroup, InputLeftElement } from '@chakra-ui/react'
import TextField from 'components/TextField'

interface ISearchInputProps {
  name?: string
  value?: string
  placeholder?: string
  defaultValue?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  width?: string | number
}

const SearchInput = (props: ISearchInputProps) => {
  const { width, value, onChange, placeholder, name, defaultValue } = props
  return (
    <Fragment>
      <InputGroup width={width}>
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.500" />
        </InputLeftElement>
        <TextField
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          paddingLeft={10}
          onChange={onChange}
        />
      </InputGroup>
    </Fragment>
  )
}

export default SearchInput
