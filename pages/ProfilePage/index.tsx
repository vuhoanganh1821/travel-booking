"use client"
import { Box, HStack, VStack, Text, Image } from "@chakra-ui/react"
import PageLayout from "components/Layout/WebLayout/PageLayout"
import TextField from "components/TextField"
import { FaUser } from "react-icons/fa"
import { IoMdNotifications } from "react-icons/io"
import { useStores } from "hooks"
import { observer } from "mobx-react"
import { useEffect, useState } from "react"
import { PLATFORM } from "enums/common"
import { IUser } from "interfaces/user"

const ProfilePage = () => {
  const { authStore } = useStores()
  const { user } = authStore

  useEffect(() => {
    const fetchData = async () => {
      await authStore.getMyUser(PLATFORM.WEBSITE)
    }
    fetchData()
  }, [])

  return (
    <PageLayout>
      <HStack
        maxWidth="1300px"
        width="full"
        minHeight="700px"
        height="full"
        align="flex-start"
        marginTop="40px"
        spacing={10}
      >
        <VStack align="flex-start" spacing={0} flex={1}>
          <Box
            width="full"
            alignItems="center"
            background="#1F5855"
            padding="30px 12px"
            color="#fff"
          >
            <HStack>
              <Image
                width="90px"
                borderRadius="4px"
                src="https://res.cloudinary.com/dxrygyw5d/image/upload/v1712026761/travelife/user/65e37174b0e7527a1ad579b6.png"
                alt="avtimg"
              />
              <VStack align="flex-start">
                <Text fontWeight="bold">{user.username}</Text>
                <Text>{user.email}</Text>
              </VStack>
            </HStack>
          </Box>
          <HStack
            width="full"
            border="2px solid #ccc"
            borderBottomColor="transparent"
            padding="15px 12px"
            fontWeight="bold"
          >
            <FaUser />
            <Text>Profile</Text>
          </HStack>
          <HStack
            width="full"
            border="2px solid #ccc"
            padding="15px 12px"
            fontWeight="bold"
          >
            <IoMdNotifications />
            <Text>Notification</Text>
          </HStack>
        </VStack>
        <VStack flex={3} align="flex-start">
          <Text fontSize="xl" fontWeight="bold" marginBottom="8px">
            Profile detail
          </Text>
          <HStack
            width="full"
            justify="space-between"
            align="flex-start"
            spacing={10}
          >
            <VStack width="full" align="flex-start">
              <Text>First name</Text>
              <TextField value={user.fullname?.[0] || ""} />
            </VStack>
            <VStack width="full" align="flex-start">
              <Text>Last name</Text>
              <TextField
                value={user.fullname?.slice(1, user.fullname.length)}
              />
            </VStack>
          </HStack>
          <Text fontSize="xl" fontWeight="bold" marginBottom="8px">
            Contact detail
          </Text>
          <HStack width="full" justify="space-between" spacing={10}>
            <VStack width="full" align="flex-start">
              <Text>Email</Text>
              <TextField value={user.email || ""} />
            </VStack>
            <VStack width="full" align="flex-start">
              <Text>Mobile phone</Text>
              <TextField />
            </VStack>
          </HStack>
        </VStack>
      </HStack>
    </PageLayout>
  )
}

export default observer(ProfilePage)
