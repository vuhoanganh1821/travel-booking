import { Box, Center, Heading, VStack } from '@chakra-ui/react'
import NavLink from './NavLink'
import { usePathname, useRouter } from 'next/navigation'
import routes from 'routes'

const SideBar = () => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Box width="320px" background="teal.900">
      <Center height="72px" borderBottom="1px" borderBottomColor="whiteAlpha.300">
        <Heading color="white" fontSize="2xl">TRAVEL BOOKING</Heading>
      </Center>
      <VStack width="full" align="unset" paddingY={6} paddingX={4} spacing={4}>
        <NavLink
          label="Booking Management"
          icon=""
          route={routes.cms.bookingManagement.value}
        />
        <NavLink
          label="Tour Management"
          icon=""
          route={routes.cms.tourManagement.value}
        />
        <NavLink
          label="Account Management"
          icon=""
          route={routes.cms.accountManagement.value}
        />
        <NavLink
          label="General Settings"
          icon=""
          route={routes.cms.generalSettings.value}
        />
      </VStack>
    </Box>
  )
}

export default SideBar
