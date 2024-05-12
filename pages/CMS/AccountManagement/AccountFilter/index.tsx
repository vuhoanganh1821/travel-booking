import React, { useEffect, useState } from 'react'
import {
  Button,
  Checkbox,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Text
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { ERole } from 'enums/user'
import { useStores } from 'hooks/useStores'
import { observer } from 'mobx-react'
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { getValidArray } from 'utils/common'

export interface IAccountFilterForm {
  isAdmin?: boolean
  isUser?: boolean
  isGuide?: boolean
}

interface IAccountFilterProps {
  isOpen: boolean
  onClose: () => void
}

const AccountFilter = (props: IAccountFilterProps) => {
  const { isOpen, onClose } = props
  const { userStore } = useStores()
  const methods: UseFormReturn = useForm<IAccountFilterForm>()
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting }
  } = methods
  const initialFilter: IAccountFilterForm = {
    isAdmin: false,
    isUser: false,
    isGuide: false,
  }

  function resetForm(): void {
    reset(initialFilter)
  }

  async function onSubmit(data: IAccountFilterForm): Promise<void> {
    let query = ''
    if (data?.isAdmin) {
      query += '&role=admin'
    }
    if (data?.isUser) {
      query += '&role=user'
    }
    if (data?.isGuide) {
      query += '&role=guide'
    }
    await userStore.fetchAllUsers(query)
    onClose()
  }

  useEffect(() => {

  }, [])

  useEffect(() => {
    if (isOpen) {
      resetForm()
    }
  }, [isOpen])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} id="filter-form">
        <Drawer isOpen={isOpen} onClose={onClose} size="sm" placement="right">
          <DrawerOverlay />
          <DrawerContent>
            <Flex flexDirection="column" height="stretch">
              <ModalHeader boxShadow="base">
                <Text>Filter</Text>
              </ModalHeader>
              <ModalBody padding={6}>
                <FormControl id="role" marginBottom={6}>
                  <FormLabel marginBottom={4} color="gray.700">
                    Account Role
                  </FormLabel>
                  <HStack width="full" spacing={20}>
                    <Checkbox colorScheme="teal" {...register('isAdmin')}>
                      Admin
                    </Checkbox>
                    <Checkbox colorScheme="teal" {...register('isUser')}>
                      User
                    </Checkbox>
                    <Checkbox colorScheme="teal" {...register('isGuide')}>
                      Guide
                    </Checkbox>
                  </HStack>
                </FormControl>
              </ModalBody>
              <ModalFooter flex={1} placeItems="flex-end" marginBottom={4}>
                <Button
                  width="full"
                  color="teal.500"
                  background="white"
                  marginRight={4}
                  onClick={resetForm}
                  isLoading={isSubmitting}
                >
                  Reset
                </Button>
                <Button width="full" type="submit" form="filter-form" colorScheme="teal" isLoading={isSubmitting}>
                  Apply filter
                </Button>
              </ModalFooter>
            </Flex>
          </DrawerContent>
        </Drawer>
      </form>
    </FormProvider>
  )
}

export default observer(AccountFilter)
