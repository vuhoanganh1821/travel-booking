'use client'
import { useEffect, useState } from 'react'
import { Box, HStack, Input, InputGroup, InputLeftElement, Link } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import Table, { IPagination } from 'components/Table'
import { useStores } from 'hooks/useStores'
import get from 'lodash/get'
import { getValidArray } from 'utils/common'
import { getHeaderList } from './utils'
import { observer } from 'mobx-react'

const BookingManagement = () => {
  const { bookingStore } = useStores()
  const { bookings } = bookingStore
  const pageIndex: number = 1
  const [pageSize, setPageSize] = useState<number>(10)

  const pagination: IPagination = { pageIndex, tableLength: 10, gotoPage }

  const dataInTable = getValidArray(bookings).map(booking => {
    return {
      ...booking,
    }
  })

  function gotoPage(page: number): void {}

  useEffect(() => {
    bookingStore.fetchAllBookings()
  }, [bookingStore])

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

export default observer(BookingManagement)
