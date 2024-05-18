"use client";
import { VStack, Button, Text, Link } from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation';
import { useStores } from 'hooks/useStores'

import FormInput from 'components/FormInput';
import { IResetPasswordRequest } from 'interfaces/auth';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';


const ForgotPassword = () => {
  const {authStore} = useStores();
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const route = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resetToken, setResetToken] = useState<string>('');

  const methods = useForm<IResetPasswordRequest>()
  const { handleSubmit } = methods 

  useEffect(() => {
   
    const token = searchParams?.get('token')
    if(token){
      setResetToken(token)
    }

  }, [pathname, searchParams]);

  async function onSubmit(data: IResetPasswordRequest){
    try{
      setIsLoading(true)
      await authStore.resetPassword(data, resetToken)
      setIsLoading(false)
      toast.success('Reset password complete')
      route.push('/')
    } catch{
      setIsLoading(false)
    }
  }

  return (
    <VStack 
      display='flex'
      justifyContent='center'  
      alignItems='center'    
      background="#F5F5F5"
      minHeight="100vh"       
      padding={0}            
      margin={0}    
    >
      <VStack 
        height='520px'
        width='540px'
        background={'#fff'} 
        borderRadius='10px'
        border='2px solid teal' 
        boxShadow='lg' 
        padding='40px'
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
              <Text fontSize='4xl' fontWeight='bold' mb={2}>Change your password</Text>
              <Text marginBottom={6} fontSize='xl' textAlign='center'>Enter your password below to change your password</Text>
              <FormInput
                type="password"
                name="password"
                label="New password" 
              />
              <FormInput
                type="password"
                name="passwordConfirm"
                label="Confirm password"/>
              
              <Button 
                type='submit' 
                marginTop='20px' 
                size='lg' 
                width='full' 
                colorScheme="teal" 
                mb={4}
                isLoading={isLoading}
              >
                  Reset Password
                </Button>
            </VStack>
          </form>
        </FormProvider>
        {/* <Text alignSelf='flex-end' fontSize="md">Remember your password? <Link color="teal.500" href="/login">Log in</Link></Text> */}
        
      </VStack>
    </VStack>
  );
}

export default ForgotPassword;
