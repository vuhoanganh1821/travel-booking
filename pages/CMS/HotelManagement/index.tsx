'use client'
import { useEffect, useState } from 'react'
import { Box, Button, HStack, Input, InputGroup, InputLeftElement, Tag, TagLabel } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import Icon from 'components/Icon'
import Table from 'components/Table'
import { useStores } from 'hooks/useStores'
import { IHotel } from 'interfaces/hotel'
import debounce from 'lodash/debounce'
import { observer } from 'mobx-react'
import { useRouter } from 'next/navigation'
import { getValidArray } from 'utils/common'
// import HotelForm from './HotelForm'
import { getHeaderList } from './utils'

const HotelManagement = () => {
  const { hotelStore } = useStores()
  const { hotels } = hotelStore
  const router = useRouter()
  const pageIndex: number = 1
  const [pageSize, setPageSize] = useState<number>(10)
  const [hotelId, setHotelId] = useState<string>('')
  const [searchText, setSearchText] = useState<string>('')
  const [isOpenHotelForm, setIsOpenHotelForm] = useState<boolean>(false)

  const pagination = { pageIndex, tableLength: 10, gotoPage }

  const dataInTable = getValidArray(hotels).map(hotel => {
    function onClickEditHotel(): void {
      setIsOpenHotelForm(true)
      setHotelId(hotel?._id ?? '')
    }

    return {
      ...hotel,
      actions: (
        <HStack width="86px" cursor="pointer" marginLeft="auto">
          <Icon iconName="edit.svg" size={32} onClick={onClickEditHotel} />
          <Icon iconName="trash.svg" size={32} />
        </HStack>
      )
    }
  })

  function gotoPage(page: number): void {}

  useEffect(() => {
    if (searchText) {
      hotelStore.fetchSearchHotels(searchText)
    } else {
      hotelStore.fetchAllHotels()
    }
  }, [searchText])

  const debounceSearch = debounce((searchKeyword: string) => {
    setSearchText(searchKeyword)
  }, 500)

  return (
    <Box paddingX={{ base: 6, lg: 8 }} paddingY={6}>
      <HStack justify="space-between" spacing={4} marginBottom={6}>
        <InputGroup borderRadius="6px" maxWidth="400px" background="white">
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.400" />
          </InputLeftElement>
          <Input
            type="search"
            placeholder="Search hotel by title"
            onChange={(event) => debounceSearch(event?.target?.value)}
          />
        </InputGroup>
        <Button
          colorScheme="teal"
          onClick={() => {
            setHotelId('')
            setIsOpenHotelForm(true)
          }}
        >
          Create New Hotel
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
      {/* <HotelForm hotelId={hotelId} isOpen={isOpenHotelForm} onClose={() => setIsOpenHotelForm(false)} /> */}
    </Box>
  )
}

export default observer(HotelManagement)
