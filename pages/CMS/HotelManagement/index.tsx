'use client'
import { useEffect, useState } from 'react'
import { Box, Button, HStack, Img, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { deleteHotel } from 'API/hotel'
import ConfirmModal from 'components/ConfirmModal'
import Icon from 'components/Icon'
import Table from 'components/Table'
import { useStores } from 'hooks/useStores'
import { IHotel } from 'interfaces/hotel'
import debounce from 'lodash/debounce'
import { observer } from 'mobx-react'
import { useRouter } from 'next/navigation'
import { getValidArray } from 'utils/common'
import HotelForm from './HotelForm'
import { getHeaderList } from './utils'
import { toast } from 'react-toastify'

const HotelManagement = () => {
  const { hotelStore } = useStores()
  const { hotels } = hotelStore
  const router = useRouter()
  const pageIndex: number = 1
  const [pageSize, setPageSize] = useState<number>(10)
  const [hotel, setHotel] = useState<IHotel>()
  const [searchText, setSearchText] = useState<string>('')
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [isOpenHotelForm, setIsOpenHotelForm] = useState<boolean>(false)

  const pagination = { pageIndex, tableLength: 10, gotoPage }

  const dataInTable = getValidArray(hotels).map(hotel => {
    function onClickEditHotel(): void {
      setHotel(hotel)
      setIsOpenHotelForm(true)
    }

    function onClickDeleteHotel(): void {
      setHotel(hotel)
      setIsDeleting(true)
    }

    return {
      ...hotel,
      thumbnail: hotel?.thumbnail && <Img boxSize={10} src={hotel?.thumbnail} borderRadius={8} />,
      actions: (
        <HStack width="86px" cursor="pointer" marginLeft="auto">
          <Icon iconName="edit.svg" size={32} onClick={onClickEditHotel} />
          <Icon iconName="trash.svg" size={32} onClick={onClickDeleteHotel} />
        </HStack>
      )
    }
  })

  function gotoPage(page: number): void {}

  async function handleDeleteHotel(): Promise<void> {
    try {
      if (hotel?._id) {
        await deleteHotel(hotel?._id)
        await hotelStore.fetchAllHotels()
        toast.success('Delete hotel successfully')
      }
    } catch (error) {
      toast.error('Delete hotel failed')
    }
  }

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
            placeholder="Search hotel by name"
            onChange={(event) => debounceSearch(event?.target?.value)}
          />
        </InputGroup>
        <Button
          colorScheme="teal"
          onClick={() => {
            setHotel(undefined)
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
      <HotelForm hotel={hotel} isOpen={isOpenHotelForm} onClose={() => setIsOpenHotelForm(false)} />
      <ConfirmModal
        titleText="Delete Hotel"
        bodyText={<Text>Are you sure to delete this hotel?{<br />}This action can not be undo</Text>}
        cancelButtonText="No, keep this hotel"
        confirmButtonText="Yes, delete"
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onClickAccept={handleDeleteHotel}
      />
    </Box>
  )
}

export default observer(HotelManagement)
