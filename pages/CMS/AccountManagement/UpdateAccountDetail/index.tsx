'use client'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Avatar, Box, Button, FormControl, FormLabel, HStack, Radio, RadioGroup, SimpleGrid, Text, VStack } from '@chakra-ui/react'
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

interface IUpdateAccountForm extends IUser {}

const UpdateAccountDetail = () => {
  const { userStore } = useStores()
  const { userDetail } = userStore
  const router = useRouter()
  const pathname = usePathname()
  const fileInputRef = useRef<any>(null)
  const userId = pathname?.split('/').pop() ?? ''
  const methods = useForm<IUpdateAccountForm>()
  const { control, handleSubmit, reset, register, setValue } = methods
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false)
  const role: string = useWatch({ control, name: 'role' }) ?? ''
  const profilePicture: string = useWatch({ control, name: 'profilePicture' }) ?? ''

  function backToAccountList() {
    router.push(routes.cms.accountManagement.value)
  }

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

  async function onSubmit(data: IUpdateAccountForm) {
    setIsLoading(true)
    try {
      await updateUser(userId, omit(data, ['dateOfIssuePassport', 'dateOfExpirationPassport']))
      await userStore.fetchUserDetail(userId)
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
      userStore.fetchUserDetail(userId)
    }
  }, [userId])

  useEffect(() => {
    if (userDetail?._id) {
      reset({
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
    <Box paddingX={{ base: 6, lg: 8 }} paddingY={6}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HStack width="full" justify="space-between" marginBottom={6}>
            <Text fontSize="lg" fontWeight={600}>
              Update Account Detail
            </Text>
            <HStack spacing={4}>
              <Button background="white" borderWidth={1} isLoading={isLoading} onClick={backToAccountList}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="teal" variant="solid" paddingX={4} isLoading={isLoading}>
                Save
              </Button>
            </HStack>
          </HStack>
          <HStack width="full" align="flex-start" spacing={8}>
            <Box width="full" background="white" padding={8} borderRadius={8} borderWidth={1} boxShadow="sm">
              <SimpleGrid maxWidth="1200px" columns={{ base: 1, md: 2 }} gap={6}>
                <FormInput name="username" label="Username" />
                <FormInput name="email" label="Email" />
                <FormInput name="nationality" label="Nationality" />
                <FormInput name="address" label="Address" />
                <FormInput name="phone" label="Phone number" />
                <FormInput name="passport" label="Passport" />
                <FormInput name="dateOfIssuePassport" label="Date Of Issue Passport" isRequired={false} />
                <FormInput name="dateOfExpirationPassport" label="Date Of Expiration Passport" isRequired={false} />
                <FormControl id="role" marginBottom={6}>
                  <FormLabel marginBottom={4} color="gray.700">
                    Account Role
                  </FormLabel>
                  <RadioGroup value={role}>
                    <HStack spacing={2} flexDirection="row" gap="42px">
                      <Radio colorScheme="teal" {...register('role')} value={ERole.ADMIN}>
                        Admin
                      </Radio>
                      <Radio colorScheme="teal" {...register('role')} value={ERole.USER}>
                        User
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
              </SimpleGrid>
            </Box>
            <VStack
              maxWidth={300}
              width="full"
              background="white"
              padding={8}
              borderRadius={8}
              borderWidth={1}
              boxShadow="sm"
              spacing={6}
            >
              <Avatar size="2xl" src={profilePicture} background="gray.400" borderWidth={1} />
              <Button
                width="full"
                background="white"
                borderWidth={1}
                isLoading={isImageLoading}
                onClick={() => fileInputRef?.current?.click()}
              >
                Change Image
              </Button>
              <input type="file" ref={fileInputRef} onChange={uploadImage} style={{ display: 'none' }} />
            </VStack>
          </HStack>
        </form>
      </FormProvider>
    </Box>
  )
}

export default observer(UpdateAccountDetail)
