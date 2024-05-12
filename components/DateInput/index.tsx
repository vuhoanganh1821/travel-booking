import React, { ForwardedRef, HTMLProps } from 'react'
import { Flex, Input, chakra } from '@chakra-ui/react'
import Icon from 'components/Icon'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import NumberFormat from 'react-number-format'

dayjs.extend(advancedFormat)

const DatePickerWrapper = chakra(Flex, {
  baseStyle: () => ({
    height: 10,
    paddingX: '1rem',
    paddingY: '8px',
    borderRadius: '6px',
    paddingBottom: '10px',
    border: 'solid 1px #E2E8F0',
    justifyContent: 'space-between',
  })
})

export const DateInput = (props: HTMLProps<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <DatePickerWrapper onClick={props?.onClick} ref={ref}>
      <Input
        ref={ref}
        as={NumberFormat}
        {...(props as HTMLProps<HTMLInputElement>)}
        variant="unstyled"
        size="sm"
        fontSize="md"
        format="##/##/####"
        placeholder="MM/DD/YYYY"
        mask={['M', 'M', 'D', 'D', 'Y', 'Y', 'Y', 'Y']}
      />
      <Icon iconName="date.svg" size={20} />
    </DatePickerWrapper>
  )
}

export default DateInput
