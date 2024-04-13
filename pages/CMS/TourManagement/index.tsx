'use client'
import { useEffect, useState } from 'react'
import { Box, HStack, Img, Input, InputGroup, InputLeftElement, Tag, TagLabel, Text, useDisclosure } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { deleteTour } from 'API/tour'
import ConfirmModal from 'components/ConfirmModal'
import Icon from 'components/Icon'
import Table, { IPagination } from 'components/Table'
import { useStores } from 'hooks/useStores'
import { observer } from 'mobx-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import routes from 'routes'
import { getValidArray } from 'utils/common'
import { getHeaderList } from './utils'

const TourManagement = () => {
  const { tourStore } = useStores()
  const { tours } = tourStore
  const router = useRouter()
  const pageIndex: number = 1
  const [pageSize, setPageSize] = useState<number>(10)
  const [selectedTourId, setSelectedTourId] = useState<string>()
  const { isOpen: isConfirming, onOpen: onConfirm, onClose: closeConfirm } = useDisclosure()

  const pagination: IPagination = { pageIndex, tableLength: 10, gotoPage }

  const dataInTable = getValidArray(tours).map(tour => {
    function gotoEditTourDetail(): void {
      router.push(routes.cms.tourManagement.detail.value(tour?._id))
    }

    return {
      ...tour,
      thumbnail: (
        <Img boxSize={10} src={tour?.thumbnail} borderRadius={8} />
      ),
      status: tour?.isActive ? (
        <Tag variant="outline" colorScheme="green" backgroundColor="green.50">
          <TagLabel>Active</TagLabel>
        </Tag>
      ) : (
        <Tag variant="outline" colorScheme="yellow" backgroundColor="yellow.50">
          <TagLabel>Inactive</TagLabel>
        </Tag>
      ),
      actions: (
        <HStack width="86px" cursor="pointer" marginLeft="auto">
          <Icon iconName="edit.svg" size={32} onClick={gotoEditTourDetail} />
          <Icon iconName="trash.svg" size={32} onClick={() => onClickDeleteTour(tour?._id)} />
        </HStack>
      )
    }
  
  })

  function gotoPage(page: number): void {
    // router.push(`${routes.cms.tourManagement.value}?page=${page}`)
  }

  function onClickDeleteTour(tourId: string): void {
    setSelectedTourId(tourId)
    onConfirm()
  }

  async function handleDeleteTour(): Promise<void> {
    try {
      if (selectedTourId) {
        await deleteTour(selectedTourId)
        await tourStore.fetchAllTours()
        closeConfirm()
        toast.success('Delete tour successfully')
      }
    } catch (error) {
      closeConfirm()
      toast.error('Delete tour failed')
    }
  }

  useEffect(() => {
    tourStore.fetchAllTours()
  }, [tourStore])

  return (
    <Box paddingX={{ base: 6, lg: 8 }} paddingY={6}>
      <HStack spacing={4} marginBottom={6}>
        <InputGroup borderRadius="6px" maxWidth="400px" background="white">
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.400" />
          </InputLeftElement>
          <Input
            type="search"
            placeholder="Search tour by name"
            // onChange={changeName}
          />
        </InputGroup>
        {/* <Box borderRadius="6px" background="white">
          <ButtonWithIcon
            label={filterText}
            iconName={numberFiltered > 0 ? 'filter_teal500.png' : 'filter.svg'}
            size={16}
            border={numberFiltered > 0 ? '1px solid #319795 !important' : '1px solid #E2E8F0'}
            onClick={openFilterModal}
            color={numberFiltered > 0 ? '#319795 !important' : 'gray.800'}
          />
        </Box> */}
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
      <ConfirmModal
        titleText="Delete Tour"
        bodyText={<Text>Are you sure to delete this tour?{<br />}This action can not be undo</Text>}
        cancelButtonText="No, keep this tour"
        confirmButtonText="Yes, delete"
        isOpen={isConfirming}
        onClose={closeConfirm}
        onClickAccept={handleDeleteTour}
      />
    </Box>
  )
}

export default observer(TourManagement)
