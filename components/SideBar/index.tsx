import { Box, Center, Heading, VStack } from '@chakra-ui/react'
import NavLink from './NavLink'

interface ISideBarProps {
  isCollapsed: boolean
  setIsCollapsed: (isCollapsed: boolean) => void
}

const SideBar = (props: ISideBarProps) => {
  const { isCollapsed, setIsCollapsed } = props

  return (
    <Box width="320px" background="teal.900">
      <Center height="72px" borderBottom="1px" borderBottomColor="whiteAlpha.300">
        <Heading color="white" fontSize="2xl">TRAVEL BOOKING</Heading>
      </Center>
      <VStack width="full" align="unset" paddingY={6} paddingX={4} spacing={4}>
        <NavLink label="Booking Management" icon="" isActive />
        <NavLink label="Tour Management" icon="" isActive />
        <NavLink label="Account Management" icon="" isActive />
        <NavLink label="Settings" icon="" isActive />
      </VStack>
    </Box>
  )
}

export default SideBar
