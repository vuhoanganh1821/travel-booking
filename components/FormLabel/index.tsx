import { FormLabel } from '@chakra-ui/react'

interface IFormLabelValueProps {
  label: string
  value?: string
  gridColumn?: string
  children?: React.ReactNode
}

const FormLabelValue = (props: IFormLabelValueProps) => {
  const { label, value, gridColumn = 'span 3', children } = props

  return (
    <>
      <FormLabel color="gray.500" fontWeight={400} lineHeight={6}>
        {label}
      </FormLabel>
      {children ? (
        children
      ) : (
        <FormLabel color="gray.900" fontWeight={500} lineHeight={6} gridColumn={gridColumn}>
          {value} 
        </FormLabel>
      )}
    </>
  )
}

export default FormLabelValue
