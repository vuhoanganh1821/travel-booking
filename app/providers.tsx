'use client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  components: {
    Checkbox: {
      defaultProps: {
        colorScheme: 'teal'
      }
    },
    Input: {
      defaultProps: {
        colorScheme: 'teal',
        focusBorderColor: 'teal.500'
      }
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}