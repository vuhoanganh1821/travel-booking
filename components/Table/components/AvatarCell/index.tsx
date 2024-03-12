import { Avatar } from '@chakra-ui/react'

interface AvatarCellProps {
  value: string
}

const AvatarCell = (props: AvatarCellProps) => {
  const { value } = props
  return <Avatar colorScheme="teal" src={value} size="sm" />
}

export default AvatarCell
