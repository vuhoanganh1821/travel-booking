import { FormLabel } from '@chakra-ui/react'

interface IFormLabelValueProps {
  label: string
  value?: string
  children?: React.ReactNode
}

const FormLabelValue = (props: IFormLabelValueProps) => {
  const { label, value, children } = props

  return (
    <>
      <FormLabel color="gray.700" fontWeight={500} lineHeight={6}>
        {label}
      </FormLabel>
      {children ? (
        children
      ) : (
        <FormLabel color="gray.800" fontWeight={500} lineHeight={6} gridColumn="span 3">
          {value}
        </FormLabel>
      )}
    </>
  )
}

export default FormLabelValue
