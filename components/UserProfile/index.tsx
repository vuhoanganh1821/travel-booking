'use client'
import { Flex, HStack, Avatar, Text, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import Icon from 'components/Icon'
import { PLATFORM } from 'enums/common'
import { useStores } from 'hooks/useStores'
import truncate from 'lodash/truncate'
import { observer } from 'mobx-react'
import { useRouter } from 'next/navigation'
import routes from 'routes'
import { getAccessToken } from 'utils/common'

interface IUserProfileProps {
  platform: PLATFORM
}

const UserProfile = (props: IUserProfileProps) => {
  const { platform } = props
  const { authStore } = useStores()
  const { user } = authStore
  const router = useRouter()
  const accessToken: string = getAccessToken(platform)
  const isLogin: boolean = !!accessToken

  function gotoProfilePage(): void {
    router.push(routes.cms.accountSettings.value)
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
      <MenuList minWidth="180px">
        <MenuItem maxH="40px" color="gray.700" onClick={gotoProfilePage}>
          <HStack marginLeft={1}>
            <Icon iconName="profile.svg" size={20} />
            <Text fontWeight={500}>My Account</Text>
          </HStack>
        </MenuItem>
        <MenuItem maxH="40px" color="red.500" onClick={handleLogout}>
          <HStack marginLeft={1}>
            <Icon iconName="logout.svg" size={20} />
            <Text fontWeight={500}>Log Out</Text>
          </HStack>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default observer(UserProfile)
