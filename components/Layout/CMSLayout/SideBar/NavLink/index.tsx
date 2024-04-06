import { HStack, Text } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'

interface INavLinkProps {
  label: string
  icon: string
  route: string
}

const NavLink = (props: INavLinkProps) => {
  const { label, icon, route } = props
  const router = useRouter()
  const pathname = usePathname()
  const isActive = pathname?.includes(route)

  return (
    <HStack 
      height={12}
      justify="space-between"
      borderRadius={6}
      paddingY={3}
      paddingX={4}
      cursor="pointer"
      onClick={() => router.push(route)}
      background={isActive ? 'teal.200' : 'transparent'}
      _hover={{ background: isActive ? 'teal.200' : 'teal.700' }}
    >
      <HStack>
        <Text color={isActive ? 'gray.800' : 'white'} fontWeight={600} lineHeight={6}>
          {label}
        </Text>
      </HStack>
    </HStack>
  )
}

export default NavLink
