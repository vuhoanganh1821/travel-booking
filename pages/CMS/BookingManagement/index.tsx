'use client'
import { useEffect, useState } from 'react'
import { Box, HStack, Input, InputGroup, InputLeftElement, Tag, TagLabel } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import Icon from 'components/Icon'
import Table, { IPagination } from 'components/Table'
import { useStores } from 'hooks/useStores'
import capitalize from 'lodash/capitalize'
import { observer } from 'mobx-react'
import { getValidArray } from 'utils/common'
import { getHeaderList } from './utils'
import { useRouter } from 'next/navigation'
import routes from 'routes'

const BookingManagement = () => {
  const { bookingStore } = useStores()
  const { bookings } = bookingStore
  const router = useRouter()
  const pageIndex: number = 1
  const [pageSize, setPageSize] = useState<number>(10)

  const pagination: IPagination = { pageIndex, tableLength: 10, gotoPage }

  const dataInTable = getValidArray(bookings).map(booking => {
    function gotoBookingDetailPage(): void {
      router.push(routes.cms.bookingManagement.detail.value(booking?._id ?? ''))
    }
    return {
      ...booking,
      status: (
        <Tag variant="outline" colorScheme="yellow" backgroundColor="yellow.50">
          <TagLabel>{capitalize(booking?.status)}</TagLabel>
        </Tag>
      ),
      actions: (
        <HStack width="86px" cursor="pointer" marginLeft="auto">
          <Icon iconName="edit.svg" size={32} onClick={gotoBookingDetailPage} />
          <Icon iconName="vertical-dots.svg" size={20} />
        </HStack>
      )
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
            placeholder="Search booking by name or email"
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
