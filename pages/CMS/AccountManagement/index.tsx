'use client'
import { useEffect, useState } from 'react'
import { Box, HStack, Input, InputGroup, InputLeftElement, Tag, TagLabel } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import Icon from 'components/Icon'
import Table, { IPagination } from 'components/Table'
import { useStores } from 'hooks/useStores'
import capitalize from 'lodash/capitalize'
import { getValidArray } from 'utils/common'
import { getHeaderList } from './utils'
import { observer } from 'mobx-react'
import dayjs from 'dayjs'

const AccountManagement = () => {
  const { userStore } = useStores()
  const { users } = userStore
  const pageIndex: number = 1
  const [pageSize, setPageSize] = useState<number>(10)

  const pagination: IPagination = { pageIndex, tableLength: 10, gotoPage }

  const dataInTable = getValidArray(users).map(user => {
    return {
      ...user,
      role: capitalize(user?.role),
      lastLogin: user?.lastSignInAt ? dayjs(user?.lastSignInAt).format('DD/MM/YYYY') : '',
      status: user?.isActive ? (
        <Tag size="md" variant="outline" colorScheme="green" backgroundColor="green.50">
          <TagLabel>Active</TagLabel>
        </Tag>
      ) : (
        <Tag size="md" variant="outline" colorScheme="yellow" backgroundColor="yellow.50">
          <TagLabel>Inactive</TagLabel>
        </Tag>
      ),
      actions: (
        <HStack width="86px" cursor="pointer" marginLeft="auto">
          <Icon iconName="edit.svg" size={32} />
          <Icon iconName="trash.svg" size={32} />
        </HStack>
      )
    }
  })
  console.log('dataInTable', dataInTable)

  function gotoPage(page: number): void {}

  useEffect(() => {
    userStore.fetchAllUsers()
  }, [userStore])

  return (
    <Box paddingX={{ base: 6, lg: 8 }} paddingY={6}>
      <HStack spacing={4} marginBottom={6}>
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
      </HStack>
      <Table
        headerList={getHeaderList()}
        tableData={dataInTable}
        pagination={pagination}
        pageSize={pageSize}
        setPageSize={setPageSize}
        isManualSort
        // setSort={setSort}
        // setOrderBy={setOrderBy}
        // subComponent={getSubComponent(getHeaderList(false), 2)}
      />
    </Box>
  )
}

export default observer(AccountManagement)
