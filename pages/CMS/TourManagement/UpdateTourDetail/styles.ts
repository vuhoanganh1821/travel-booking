import { chakra, Text } from '@chakra-ui/react'

export const ManageText = chakra(Text, {
  baseStyle: () => ({
    color: 'teal',
    fontSize: 'lg',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: 4,
  })
})