'use client'
import { Flex, HStack, Avatar, Text, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { PLATFORM } from 'enums/common'
import { useStores } from 'hooks/useStores'
import truncate from 'lodash/truncate'
import { observer } from 'mobx-react'
import { useRouter } from 'next/navigation'
import routes from 'routes'
import { getAccessToken } from 'utils/common'

interface IUserProfileProps {
  platform: PLATFORM
  openLoginModal?: () => void
}

const UserProfile = (props: IUserProfileProps) => {
  const { platform, openLoginModal } = props
  const { authStore } = useStores()
  const { user } = authStore
  const router = useRouter()
  const accessToken: string = getAccessToken(platform)
  const isLogin: boolean = !!accessToken

  function gotoProfilePage(): void {
    router.push(routes.myProfile.value)
  }

  function handleLogout() {
    authStore.logout(platform)
    if (platform === PLATFORM.CMS) {
      router.push(routes.cms.login.value)
    }
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
            <Avatar size="sm" name={user?.fullname} src={user?.profilePicture} background="gray.400" />
            <Flex flexDirection="column" display={{ base: 'none', md: 'flex' }} alignItems="flex-start">
              <Text fontSize="sm" fontWeight="500" lineHeight="5" marginBottom={1}>
                {truncate(user?.fullname)}
              </Text>
              <Text fontSize="xs" lineHeight="4" color="text.grey.500">
                {user?.email}
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
