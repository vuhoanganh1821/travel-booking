"use client";
import { Box, HStack, VStack, Text, Image, FormControl, Button, FormLabel, Input, FormErrorMessage, SimpleGrid } from "@chakra-ui/react";
import { toast } from 'react-toastify';
import { get } from "lodash";
import { omit } from "lodash";
import PageLayout from "components/Layout/WebLayout/PageLayout";
import TextField from "components/TextField";
import { FaUser } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { useStores } from "hooks";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { PLATFORM } from "enums/common";
import { IUser } from "interfaces/user";
import Title from "components/Title";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";




const ProfilePage = () => {
  const { handleSubmit, register, reset, formState: { errors, isSubmitting } } = useForm();
  const { authStore, userStore } = useStores();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = authStore;

  useEffect(() => {
    const fetchData = async () => {
      await authStore.getMyUser(PLATFORM.WEBSITE);
    };
    fetchData();
  }, []);

  useEffect(() => {
    reset({
      ...user,
      dateOfBirth: dayjs(user?.dateOfBirth).format('YYYY-MM-DD'),
      dateOfExpirationPassport: dayjs(user?.dateOfExpirationPassport).format('YYYY-MM-DD'),
    })
  }, [user])

   const onSubmit = async (data: any): Promise<void> => {
    try{
      setIsLoading(true)
      const userInfo: IUser = {
        fullname: data?.fullname,
        phone: data?.phone,
        email: data?.email,
        dateOfBirth: dayjs(data?.dateOfBirth).toDate(),
        gender: data?.gender,
        address: data?.address,
        passport: data?.passport,
        dateOfExpirationPassport: dayjs(data?.dateOfExpirationPassport).toDate()
      }
      const userId = user._id ?? ''
      await userStore.updateUser(userInfo, userId)
      toast.success("Update user successfully")
      setIsLoading(false)

    }catch (error) {
      setIsLoading(false)
      console.error('errorMessage', error)
      const errorMessage: string = get(error, 'data.error.message', 'Sign up failed') || JSON.stringify(error)
    }
  }

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
            borderTopRadius='2px'
            color="#fff"
          >
            <HStack>
              <Image
                width="90px"
                borderRadius="4px"
                src={user?.profilePicture}
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
        <form 
          style={{
            flex: 3, 
            background: '#fff', 
            padding: '16px', 
            borderRadius: '12px', 
            border: '1px solid teal', 
            boxShadow: ' 5px 10px rgba(0, 0, 0, 0.1)'
          }} 
          onSubmit={handleSubmit(onSubmit)}
          >
          <VStack width='full'  align="flex-start">
            <FormControl isInvalid={!!errors.name}>
              <Title text='Profile detail'/>
              <SimpleGrid
                width="full"
                columns={{ base: 1, sm: 1, md: 2 }}
                spacing={8}
              >
                <VStack align='flex-start'>
                  <FormLabel htmlFor="fullname">Full name</FormLabel>
                  <Input
                    id='fullname'
                    bg='#fff'
                    placeholder='Full name'
                    {...register('fullname', {
                      required: 'This is required',
                      minLength: { value: 4, message: 'Minimum length should be 4' },
                    })}
                    />
                </VStack>
                <VStack align='flex-start'>
                  <FormLabel htmlFor="fullname">Phone number</FormLabel>
                  <Input
                    id='phone'
                    bg='#fff'
                    placeholder='Phone number'
                    {...register('phone', {
                      required: 'This is required',
                      minLength: { value: 10, message: 'Minimum length should be 10' },
                    })}
                    />
                </VStack>
                <VStack align='flex-start'>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id='email'
                    bg='#fff'
                    placeholder='Email'
                    {...register('email', {
                      required: 'This is required',
                      minLength: { value: 10, message: 'Minimum length should be 10' },
                    })}
                    />
                </VStack>
                <VStack align='flex-start'>
                  <FormLabel htmlFor="dateOfBirth">Date of birth</FormLabel>
                  <Input
                    id='dateOfBirth'
                    bg='#fff'
                    placeholder='Date of birth'
                    {...register('dateOfBirth', {
                      required: 'This is required',
                      minLength: { value: 10, message: 'Minimum length should be 10' },
                    })}
                    />
                </VStack>
                <VStack align='flex-start'>
                  <FormLabel htmlFor="gender">Gender</FormLabel>
                  <Input
                    id='gender'
                    bg='#fff'
                    placeholder='Gender'
                    {...register('gender', {
                      required: 'This is required',
                      minLength: { value: 4, message: 'Minimum length should be 4' },
                    })}
                    />
                </VStack>
                <VStack align='flex-start'>
                  <FormLabel htmlFor="address">Address</FormLabel>
                  <Input
                    id='address'
                    bg='#fff'
                    placeholder='Address'
                    {...register('address', {
                      required: 'This is required',
                      minLength: { value: 10, message: 'Minimum length should be 10' },
                    })}
                    />
                </VStack>
                
                <VStack align='flex-start'>
                  <FormLabel htmlFor="passport">Passport</FormLabel>
                  <Input
                    id='passport'
                    bg='#fff'
                    placeholder='Passport'
                    {...register('passport', {
                      required: 'This is required',
                      minLength: { value: 10, message: 'Minimum length should be 10' },
                    })}
                    />
                </VStack>
                <VStack align='flex-start'>
                  <FormLabel htmlFor="dateOfExpirationPassport">Date of expiration passport</FormLabel>
                  <Input
                    id='dateOfExpirationPassport'
                    // value={user?.dateOfExpirationPassport?.slice(0, 10)}
                    bg='#fff'
                    placeholder='Date of expiration passport'
                    {...register('dateOfExpirationPassport', {
                      required: 'This is required',
                      minLength: { value: 0, message: 'Minimum length should be 10' },
                    })}
                    />
                </VStack>
                
              </SimpleGrid>
              <FormErrorMessage>
                {errors.name && typeof errors.name.message === 'string' && errors.name.message}
                </FormErrorMessage>
            </FormControl>
            <Button mt={4} colorScheme='teal' type="submit" isLoading={isLoading}> 
              Save
            </Button>
          </VStack>
        </form>
      </HStack>       
    </PageLayout>
  )
}

export default observer(ProfilePage)
