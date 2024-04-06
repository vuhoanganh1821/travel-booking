import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  HStack
} from '@chakra-ui/react'
import { ERole } from 'enums/user'
import { IUser } from 'interfaces/user'
import { FormProvider, useForm, useWatch } from 'react-hook-form'

interface IAccountForm extends IUser {}

interface IAccountFormProps {
  isOpen: boolean
  onClose: () => void
  user?: IUser
}

const AccountForm = (props: IAccountFormProps) => {
  const { isOpen, onClose, user } = props
  const methods = useForm<IAccountForm>()
  const {
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting },
    control,
    reset
  } = methods
  const role: string = useWatch({ control, name: 'role' })

  function handleOnClose(): void {
    reset()
    onClose()
  }

  async function onSubmit(data: IAccountForm): Promise<void> {}

  useEffect(() => {
    if (isOpen && user?._id) {
      reset(user)
    }
  }, [isOpen])

  return (
    <Modal size="xl" isOpen={isOpen} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent borderRadius={8} marginTop={0} containerProps={{ alignItems: 'center' }}>
        <ModalHeader  color="gray.800"fontSize="18px" fontWeight={500} lineHeight={7}>
          {user?._id ? 'Edit Account' : 'Create New Account'}
        </ModalHeader>
        <ModalCloseButton />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody border="1px solid #E2E8F0" padding={6}>
              <Box display="flex" gridGap={6} marginBottom={6}>
                <FormControl id="email" width={252}>
                  <FormLabel marginBottom={2} color="gray.700">
                    Email Address
                  </FormLabel>
                  <Input type="email" placeholder="Enter Email Address" {...register('email')} />
                </FormControl>
                <FormControl id="name" width={252}>
                  <FormLabel marginBottom={2} color="gray.700">
                    Full Name
                  </FormLabel>
                  <Input type="text" placeholder="Enter Full Name" {...register('username')} />
                </FormControl>
              </Box>
              <FormControl id="role" marginBottom={6}>
                <FormLabel marginBottom={4} color="gray.700">
                  Account Role
                </FormLabel>
                <RadioGroup defaultValue={role}>
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
              <FormControl id="role">
                <FormLabel marginBottom={2} color="gray.700">
                  Account Role
                </FormLabel>
                <RadioGroup defaultValue="god">
                  <Stack flexDirection="row">
                    <Radio value="god" {...register('role')} isDisabled>
                      God Mode
                    </Radio>
                  </Stack>
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

export default AccountForm
