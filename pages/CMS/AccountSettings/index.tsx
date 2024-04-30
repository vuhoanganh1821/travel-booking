'use client'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Avatar, Box, Button, Divider, HStack, Text, VStack } from '@chakra-ui/react'
import { uploadUserImage } from 'API/upload'
import { updateUser } from 'API/user'
import FormInput from 'components/FormInput'
import { ERole } from 'enums/user'
import { useStores } from 'hooks/useStores'
import { IUser } from 'interfaces/user'
import omit from 'lodash/omit'
import { observer } from 'mobx-react'
import { usePathname, useRouter } from 'next/navigation'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import routes from 'routes'
import { PLATFORM } from 'enums/common'

interface IAccountSettingsForm extends IUser {}

const AccountSettings = () => {
  const { authStore, userStore } = useStores()
  const { user } = authStore
  const { userDetail } = userStore
  const router = useRouter()
  const pathname = usePathname()
  const fileInputRef = useRef<any>(null)
  const userId = user?._id ?? ''
  const methods = useForm<IAccountSettingsForm>()
  const { control, handleSubmit, reset, register, setValue } = methods
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false)
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false)
  const role: string = useWatch({ control, name: 'role' }) ?? ''
  const profilePicture: string = useWatch({ control, name: 'profilePicture' }) ?? ''

  async function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    setIsImageLoading(true)
    if (!event.target.files || event.target.files.length === 0) {
      return
    }
    try { 
      const formData = new FormData()
      formData.append('profilePicture', event.target.files[0])
      const { profilePictureURL } = await uploadUserImage(userId, formData)
      setValue('profilePicture', profilePictureURL)
    } catch (error) {
      setIsImageLoading(false)
      toast.error('Upload failed')
    } finally {
      setIsImageLoading(false)
    }
  }

  async function onSubmit(data: IAccountSettingsForm) {
    setIsLoading(true)
    try {
      await updateUser(userId, omit(data, ['dateOfIssuePassport', 'dateOfExpirationPassport']))
      await userStore.fetchUserDetail(userId, PLATFORM.CMS)
      toast.success('Update account successfully')
    } catch (error) {
      setIsLoading(false)
      toast.error('Update account failed')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      userStore.fetchUserDetail(userId, PLATFORM.CMS)
    }
  }, [userId])

  useEffect(() => {
    if (userDetail?._id) {
      reset({
        fullname: userDetail?.fullname,
        email: userDetail?.email,
        username: userDetail?.username,
        role: userDetail?.role,
        nationality: userDetail?.nationality,
        profilePicture: userDetail?.profilePicture,
        address: userDetail?.address,
        phone: userDetail?.phone,
        passport: userDetail?.passport,
        dateOfIssuePassport: userDetail?.dateOfIssuePassport,
        dateOfExpirationPassport: userDetail?.dateOfExpirationPassport,
      })
    }
  }, [userDetail])

  return (
    <VStack width="full">
      <Box width="full" maxWidth="1000px" paddingX={{ base: 6, lg: 8 }} paddingY={6}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Text fontSize="lg" fontWeight={600} marginBottom={6}>
              General Information
            </Text>
            <VStack width="full" background="white" padding={8} borderRadius={8} borderWidth={1} boxShadow="sm">
              <HStack width="full" justify="space-between">
                <HStack>
                  <Text width="200px">
                    Profile Picture
                  </Text>
                  <Avatar size="2xl" src={profilePicture} background="gray.400" borderWidth={1} />
                </HStack>
                <Button
                  colorScheme="teal"
                  isLoading={isImageLoading}
                  onClick={() => fileInputRef?.current?.click()}
                >
                  Change Image
                </Button>
                <input type="file" ref={fileInputRef} onChange={uploadImage} style={{ display: 'none' }} />
              </HStack>
              <Divider borderColor="gray.300" borderWidth={1} marginY={4} />
              <HStack width="full">
                <Text width="200px">
                  Full Name
                </Text>
                <Text fontWeight={600} lineHeight={6}>
                  {userDetail?.fullname}
                </Text>
              </HStack>
              <Divider borderColor="gray.300" borderWidth={1} marginY={4} />
              <HStack width="full">
                <Text width="200px">
                  Username
                </Text>
                <Text fontWeight={600} lineHeight={6}>
                  {userDetail?.username}
                </Text>
              </HStack>
              <Divider borderColor="gray.300" borderWidth={1} marginY={4} />
              <HStack width="full">
                <Text width="200px">
                  Email Address
                </Text>
                <Text fontWeight={600} lineHeight={6}>
                  {userDetail?.email}
                </Text>
              </HStack>
              <Divider borderColor="gray.300" borderWidth={1} marginY={4} />
              <HStack width="full">
                <Text width="200px">
                  Phone Number
                </Text>
                <Text fontWeight={600} lineHeight={6}>
                  {userDetail?.phone}
                </Text>
              </HStack>
              <Divider borderColor="gray.300" borderWidth={1} marginY={4} />
              <HStack width="full">
                <Text width="200px">
                  Account Role
                </Text>
                <Text fontWeight={600} lineHeight={6}>
                  Admin Account
                </Text>
              </HStack>
            </VStack>
            <Text fontSize="lg" fontWeight={600} marginTop={10} marginBottom={6}>
              Change Password
            </Text>
            <VStack width="full" background="white" padding={8} borderRadius={8} borderWidth={1} boxShadow="sm">
              <HStack width="full" justify="space-between">
                <HStack width="full" align="flex-start">
                  <Text minWidth="200px">
                    Password
                  </Text>
                  {!isChangePassword ? (
                    <Text fontWeight={400} lineHeight={6}>
                      * * * * * * * *
                    </Text>
                  ) : (
                    <VStack width="full" align="flex-start" spacing={4}>
                      <FormInput
                        type="password"
                        name="newPassword"
                        placeholder="New password"
                      />
                      <FormInput
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                      />
                      <HStack>
                        <Button
                          type="submit"
                          colorScheme="teal"
                          paddingX={4}
                          isLoading={isLoading}
                        >
                          Save
                        </Button>
                        <Button
                          borderWidth={1}
                          background="white"
                          isLoading={isLoading}
                          onClick={() => setIsChangePassword(false)}
                        >
                          Cancel
                        </Button>
                      </HStack>
                    </VStack>
                  )}
                </HStack>
                <Button 
                  minWidth="170px"
                  colorScheme="teal"
                  hidden={isChangePassword}
                  onClick={() => setIsChangePassword(true)}
                >
                  Change Password
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormProvider>
      </Box>
    </VStack>
  )
}

export default observer(AccountSettings)
