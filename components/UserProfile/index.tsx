'use client'
import { Flex, HStack, Avatar, Text, Menu, MenuButton, MenuItem, MenuList, VStack } from '@chakra-ui/react'
import Icon from 'components/Icon'
import ActionItem from 'components/Layout/WebLayout/components/Header/Actions/ActionItem'
import { PLATFORM } from 'enums/common'
import { useStores } from 'hooks/useStores'
import truncate from 'lodash/truncate'
import { observer } from 'mobx-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { IoMdLogIn } from 'react-icons/io'
import routes from 'routes'
import { getAccessToken } from 'utils/common'

interface IUserProfileProps {
  openLoginModal: () => void;
  color?: string;
  underLineHoverColor?: string;
  hoverColor?: string;
}

const UserProfile = (props: IUserProfileProps) => {
  const { openLoginModal, color, underLineHoverColor, hoverColor } = props;
  const { authStore } = useStores();
  const { user, isLogin } = authStore;
  const router = useRouter();

  useEffect(() => {
    authStore.getMyUser(PLATFORM.WEBSITE);
  }, []);

  function gotoProfilePage(): void {
    router.push(routes.cms.accountSettings.value)
  }

  function handleLogout() {
    authStore.logout(PLATFORM.WEBSITE);
  }

  return (
    <Menu autoSelect={false} computePositionOnMount placement="bottom-end">
      <VStack
        _after={{
          content: '""',
          backgroundColor: "#transparent",
          height: "2px",
          width: "0px",
          mt: "-8px",
          transition: "width .1s ease-in",
        }}
        _hover={{
          "&::after": {
            width: "100%",
            backgroundColor: underLineHoverColor ? underLineHoverColor : "#fff",
          },
        }}
      >
        <MenuButton padding="0px">
          {isLogin ? (
            <HStack
              spacing={3}
              order={{ base: 1, md: 2 }}
              flex="1"
              ml="8px"
              mb="4px"
            >
              <Avatar size="md" name={user?.fullname} src={user?.profilePicture} />
              <Flex
                flexDirection="column"
                display={{ base: "none", md: "flex" }}
                alignItems="flex-start"
              >
                <Text
                  fontSize="md"
                  fontWeight="500"
                  lineHeight="5"
                  marginBottom={1}
                  color={color}
                >
                  {user?.fullname}
                </Text>
                <Text fontSize="md" lineHeight="4" color={color}>
                  {user?.email}
                </Text>
              </Flex>
            </HStack>
          ) : (
            <VStack>
              <ActionItem
                underLineHoverColor={underLineHoverColor}
                hoverColor={hoverColor}
                color={color}
                actionIcon={<FaRegUser />}
                title="Login"
                to={() => {}}
              />
            </VStack>
          )}
        </MenuButton>
      </VStack>

      <MenuList
        fontSize="md"
        minWidth="210px"
        padding="16px 0px"
        borderRadius="16px"
      >
        {isLogin ? (
          <>
            <MenuItem maxH="40px" color="gray.700" onClick={gotoProfilePage}>
              <HStack>
                <Icon iconName="profile.svg" size={20} />
                <Text fontWeight={500}>My Account</Text>
              </HStack>
            </MenuItem>
            <MenuItem maxH="40px" color="red.500" onClick={handleLogout}>
              <HStack>
                <Icon iconName="logout.svg" size={20} />
                <Text fontWeight={500}>Log Out</Text>
              </HStack>
            </MenuItem>
          </>
        ) : (
          <MenuItem
            fontWeight="600"
            maxH="40px"
            color="gray.700"
            onClick={openLoginModal}
          >
            <HStack spacing={3}>
              <IoMdLogIn fontSize="1.8rem" />
              <Text>Log in or sign up</Text>
            </HStack>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default observer(UserProfile);
