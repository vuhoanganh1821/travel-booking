'use client'
import { Flex, HStack, Avatar, Text, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useStores } from 'hooks/useStores'
import truncate from 'lodash/truncate'
import { observer } from 'mobx-react'
import { useRouter } from 'next/navigation'
import routes from 'routes'
// import { PLATFORM } from 'API/constants'
// import IconWithText from 'components/IconWithText'

interface IUserProfileProps {
  openLoginModal: () => void
}

const UserProfile = (props: IUserProfileProps) => {
  const { openLoginModal } = props
  const { authStore } = useStores()
  const { user, isLogin } = authStore
  const { name, email, avatarUrl } = user
  const router = useRouter()

  function gotoProfilePage(): void {
    router.push(routes.myProfile.value)
  }

  function handleLogout() {
    authStore.logout()
  }

  return (
    <Menu autoSelect={false} computePositionOnMount placement="bottom-end">
      <MenuButton
        padding="4px 12px"
        borderRadius="6px"
        _hover={{ background: 'gray.200' }}
        _active={{ background: 'gray.200' }}
      >
        {isLogin ? (
          <HStack spacing={3} order={{ base: 1, md: 2 }} flex="1">
            <Avatar size="sm" name={name} src={avatarUrl} />
            <Flex flexDirection="column" display={{ base: 'none', md: 'flex' }} alignItems="flex-start">
              <Text fontSize="sm" fontWeight="500" lineHeight="5" marginBottom={1}>
                {truncate(name)}
              </Text>
              <Text fontSize="xs" lineHeight="4" color="text.grey.500">
                {email}
              </Text>
            </Flex>
          </HStack>
        ) : (
          <Avatar size="sm" background="gray.400" />
        )}
      </MenuButton>
      <MenuList minWidth="160px">
        {isLogin ? (
          <>
            <MenuItem maxH="40px" color="gray.700" onClick={gotoProfilePage}>
              My Profile
            </MenuItem>
            <MenuItem maxH="40px" color="red.600" onClick={handleLogout}>
              Log Out
            </MenuItem>
          </>
        ) : (
          <MenuItem maxH="40px" color="gray.700" onClick={openLoginModal}>
            Log In
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  )
}

export default observer(UserProfile)
