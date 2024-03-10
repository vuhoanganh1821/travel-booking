import { HStack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

interface INavLinkProps {
  label: string
  icon: string
  isActive: boolean
  onClick?: () => void
}

const NavLink = (props: INavLinkProps) => {
  const { label, isActive, icon, onClick } = props
  const router = useRouter()

  return (
    <HStack height={12} background="teal.100" justify="space-between" borderRadius={6} paddingY={3} paddingX={4}>
      <HStack>
        <Text color={isActive ? 'gray.800' : 'white'} fontWeight={600} lineHeight={6}>
          {label}
        </Text>
      </HStack>
    </HStack>
  )
}

export default NavLink
