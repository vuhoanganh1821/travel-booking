'use client'
import { useEffect, useState } from 'react'
import { Avatar, Box, Button, HStack, Input, InputGroup, InputLeftElement, Tag, TagLabel, Text, useDisclosure } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { deleteUser } from 'API/user'
import ConfirmModal from 'components/ConfirmModal'
import Icon from 'components/Icon'
import Table, { IPagination } from 'components/Table'
import dayjs from 'dayjs'
import { ERole } from 'enums/user'
import { useStores } from 'hooks/useStores'
import { IUser } from 'interfaces/user'
import capitalize from 'lodash/capitalize'
import { observer } from 'mobx-react'
import { useRouter } from 'next/navigation'
import { getValidArray } from 'utils/common'
import AccountForm from './AccountForm'
import { getHeaderList } from './utils'
import { toast } from 'react-toastify'
import routes from 'routes'
import AccountFilter from './AccountFilter'

const AccountManagement = () => {
  const { userStore } = useStores()
  const { users, totalCount } = userStore
  const router = useRouter()
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [selectedUser, setSelectedUser] = useState<IUser>()
  const { isOpen: isConfirming, onOpen: onConfirm, onClose: closeConfirm } = useDisclosure()
  const { isOpen: isOpenFilterForm, onOpen: onOpenFilterForm, onClose: closeFilterForm } = useDisclosure()
  const { isOpen: isOpenAccountForm, onOpen: onOpenAccountForm, onClose: closeAccountForm } = useDisclosure()

  const pagination: IPagination = { pageIndex, tableLength: totalCount, gotoPage: setPageIndex }

  const dataInTable = getValidArray(users).map(user => {
    const statusTagColor = user?.role === ERole.ADMIN ? 'orange' : user?.role === ERole.GUIDE ? 'yellow' : 'blue'

    function gotoAccountDetail(): void {
      router.push(`${routes.cms.accountManagement.value}/${user._id}`)
    }

    return {
      ...user,
      avatar: (
        <Avatar boxSize={10} name={user?.username} src={user?.profilePicture} borderWidth={1} />
      ),
      lastLogin: user?.lastSignInAt ? dayjs(user?.lastSignInAt).format('DD/MM/YYYY') : '',
      role: (
        <Tag variant="outline" colorScheme={statusTagColor} background={`${statusTagColor}.50`}>
          <TagLabel>{capitalize(user?.role)}</TagLabel>
        </Tag>
      ),
      status: user?.isActive ? (
        <Tag variant="outline" colorScheme="green" backgroundColor="green.50">
          <TagLabel>Active</TagLabel>
        </Tag>
      ) : (
        <Tag variant="outline" colorScheme="gray" backgroundColor="gray.50">
          <TagLabel>Disable</TagLabel>
        </Tag>
      ),
      actions: (
        <HStack width="86px" cursor="pointer" marginLeft="auto">
          <Icon iconName="edit.svg" size={32} onClick={gotoAccountDetail} />
          <Icon iconName="trash.svg" size={32} onClick={() => onClickDeleteAccount(user)} />
        </HStack>
      )
    }
  })

  function gotoPage(page: number): void {}

  function setAccountForm(isOpen: boolean, user?: IUser): void {
    setSelectedUser(user)
    if (isOpen) {
      onOpenAccountForm()
    } else {
      closeAccountForm()
    }
  }

  function onClickDeleteAccount(user: IUser): void {
    setSelectedUser(user)
    onConfirm()
  }

  async function handleDeleteAccount(): Promise<void> {
    try {
      if (selectedUser?._id) {
        await deleteUser(selectedUser?._id)
        await userStore.fetchAllUsers()
        closeConfirm()
        toast.success('Delete account successfully')
      }
    } catch (error) {
      closeConfirm()
      toast.error('Delete account failed')
    }
  }

  useEffect(() => {
    userStore.fetchAllUsers('', pageIndex)
  }, [pageIndex])

  return (
    <Box paddingX={{ base: 6, lg: 8 }} paddingY={6}>
      <HStack justify="space-between" marginBottom={6}>
        <HStack width="50%" spacing={4}>
          <InputGroup borderRadius="6px" maxWidth="400px" background="white">
            <InputLeftElement pointerEvents="none">
              <Search2Icon color="gray.400" />
            </InputLeftElement>
            <Input
              type="search"
              placeholder="Search account by name or email"
              // onChange={changeName}
            />
          </InputGroup>
          <Button
            background="white"
            borderWidth={1}
            onClick={onOpenFilterForm}
            leftIcon={<Icon iconName="filter.svg" size={16} />}
          >
            Filter
          </Button>
        </HStack>
        <Button colorScheme="teal" onClick={() => setAccountForm(true)}>
          Create New Account
        </Button>
      </HStack>
      <Table
        headerList={getHeaderList()}
        tableData={dataInTable}
        pagination={pagination}
        pageSize={pageSize}
        setPageSize={setPageSize}
        isManualSort
      />
      <AccountForm
        user={selectedUser}
        isOpen={isOpenAccountForm}
        onClose={() => setAccountForm(false)}
      />
      <AccountFilter isOpen={isOpenFilterForm} onClose={closeFilterForm} />
      <ConfirmModal
        titleText="Delete Account"
        bodyText={<Text>Are you sure to delete this account?{<br />}This action can not be undo</Text>}
        cancelButtonText="No, keep this account"
        confirmButtonText="Yes, delete"
        isOpen={isConfirming}
        onClose={closeConfirm}
        onClickAccept={handleDeleteAccount}
      />
    </Box>
  )
}

export default observer(AccountManagement)
