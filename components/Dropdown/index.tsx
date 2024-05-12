import { FormControl, FormLabel } from '@chakra-ui/react'
import { GroupBase, MultiValue, Select } from 'chakra-react-select'
import get from 'lodash/get'
import { useFormContext, useWatch } from 'react-hook-form'

export interface IOption {
  label: string
  value: string
}

interface IDropdownProps {
  name: string
  label: string
  options: IOption[]
  placeholder?: string
  setValue: any
  gridColumn?: string
}

const Dropdown = (props: IDropdownProps) => {
  const { name, label, options, placeholder, setValue, gridColumn } = props
  const { control } = useFormContext()
  const value = useWatch({ control, name })

  return (
    <FormControl gridColumn={gridColumn}>
      <FormLabel color="gray.700" marginBottom={2}>
        {label}
      </FormLabel>
      <Select<IOption, true, GroupBase<IOption>>
        size="md"
        name={name}
        value={value}
        options={options}
        colorScheme="teal"
        placeholder={placeholder}
        isClearable
        onChange={(option: MultiValue<IOption>) => {
          setValue(name, { label: get(option, 'label', ''), value: get(option, 'value', '') })
        }}
        chakraStyles={{
          container: (provided: Record<string, unknown>) => ({
            ...provided,
            width: 'full',
            cursor: 'pointer',
          }),
          dropdownIndicator: (provided: Record<string, unknown>) => ({
            ...provided,
            bg: 'transparent',
            px: 2,
            cursor: 'pointer',
            color: 'gray.700',
          }),
          indicatorSeparator: (provided: Record<string, unknown>) => ({
            ...provided,
            display: 'none',
          }),
          clearIndicator: (provided: Record<string, unknown>) => ({
            ...provided,
            display: 'none',
          }),
          menu: (provided: Record<string, unknown>) => ({
            ...provided,
            zIndex: 9999,
            boxShadow: 'md',
          }),
          option: (provided: Record<string, unknown>, { isSelected }) => ({
            ...provided,
            cursor: 'pointer',
            color: 'gray.800',
            _hover: {
              background: 'teal.100',
            },
            _selected: {
              background: isSelected ? 'teal.100' : 'auto'
            }
          }),
        }}
      />
    </FormControl>
  )
}

export default Dropdown
