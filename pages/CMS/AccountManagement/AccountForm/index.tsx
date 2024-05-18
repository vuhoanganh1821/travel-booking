import React, { useEffect, useState } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  SimpleGrid
} from '@chakra-ui/react'
import FormInput from 'components/FormInput'
import { ERole } from 'enums/user'
import { IUser } from 'interfaces/user'
import { FormProvider, useForm, useWatch } from 'react-hook-form'

interface ICreateAccount extends IUser {}

interface ICreateAccountProps {
  isOpen: boolean
  onClose: () => void
  user?: IUser
}

const CreateAccount = (props: ICreateAccountProps) => {
  const { isOpen, onClose, user } = props
  const methods = useForm<ICreateAccount>()
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    control,
    reset
  } = methods
  const role: string = useWatch({ control, name: 'role' }) ?? ''

  function handleOnClose(): void {
    reset()
    onClose()
  }

  async function onSubmit(data: ICreateAccount): Promise<void> {
  }

  useEffect(() => {
    if (isOpen && user?._id) {
      reset(user)
    }
  }, [isOpen])

  return (
    <Modal size="xl" isOpen={isOpen} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent borderRadius={8}>
        <ModalHeader  color="gray.800"fontSize="18px" fontWeight={500} lineHeight={7}>
          Create New Account
        </ModalHeader>
        <ModalCloseButton />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody border="1px solid #E2E8F0" padding={6}>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                <FormInput name="fullname" label="Full Name" placeholder="Enter Full Name" />
                <FormInput name="username" label="Username" placeholder="Enter Username" />
                <FormInput name="email" label="Email Address" placeholder="Enter Email Address" />
                <FormInput name="password" label="Password" type="password" placeholder="Enter Password" />
              </SimpleGrid>
              <FormControl id="role" marginTop={6}>
                <FormLabel marginBottom={4} color="gray.700">
                  Account Role
                </FormLabel>
                <RadioGroup defaultValue={role}>
                  <HStack spacing={2} flexDirection="row" gap="42px">
                    <Radio colorScheme="teal" {...register('role')} value={ERole.ADMIN}>
                      Admin
                    </Radio>
                    <Radio colorScheme="teal" {...register('role')} value={ERole.GUIDE}>
                      Guide
                    </Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                color="gray.700"
                background="white"
                lineHeight={6}
                border="1px solid #E2E8F0"
                border-radius="6px"
                paddingY={2}
                marginRight={4}
                onClick={handleOnClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                colorScheme="teal"
                border-radius="6px"
                lineHeight={6}
                paddingY={2}
                isLoading={isSubmitting}
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  )
}

export default CreateAccount
