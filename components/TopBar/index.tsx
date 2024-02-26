import { HamburgerIcon } from '@chakra-ui/icons'
import { HStack, IconButton, Text } from '@chakra-ui/react'
import UserProfile from 'components/UserProfile'

interface ITopBarProps {
  title: string
  isCollapsedSidebar: boolean
  setIsCollapsedSidebar: (newIsCollapsed: boolean) => void
}

const TopBar = (props: ITopBarProps) => {
  const { title, isCollapsedSidebar, setIsCollapsedSidebar } = props

  function toggleSideBar() {
    setIsCollapsedSidebar(!isCollapsedSidebar)
  }

  return (
    <HStack
      height="72px"
      background="white"
      justify="space-between"
      paddingX={3}
      boxShadow="base"
      position={{ base: 'static', md: 'fixed' }}
      left={isCollapsedSidebar ? '80px' : '320px'}
      right={0}
      zIndex={1000}
    >
      <HStack>
        <IconButton
          size="md"
          variant="ghost"
          fontSize="24px"
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          _hover={{ background: 'gray.200' }}
          onClick={toggleSideBar}
        />
        <Text fontSize="xl" fontWeight="600">
          {title}
        </Text>
      </HStack>
      <UserProfile />
    </HStack>
  )
}

export default TopBar
