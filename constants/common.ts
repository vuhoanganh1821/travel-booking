import { EDiscountAppliesTo, EDiscountType } from 'enums/discount'

export const EMAIL_PATTERN: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

export const currencyOptions = [
  { label: 'VND', value: 'VND' },
  { label: 'USD', value: 'USD' }
]

export const tourTypeOptions = [
  { label: 'Activity', value: 'activity' }
]

export const discountTypeOptions = [
  { label: 'Percentage', value: EDiscountType.PERCENTAGE },
  { label: 'Fixed Amount', value: EDiscountType.FIXED_AMOUNT }
]

export const discountAppliesToOptions = [
  { label: 'Specific', value: EDiscountAppliesTo.SPECIFIC },
  { label: 'Total Order', value: EDiscountAppliesTo.TOTAL_ORDER }
]
