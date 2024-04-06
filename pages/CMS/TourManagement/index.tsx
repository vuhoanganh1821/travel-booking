'use client'
import { useEffect, useState } from 'react'
import { Box, HStack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import Icon from 'components/Icon'
import Table, { IPagination } from 'components/Table'
import { useStores } from 'hooks/useStores'
import get from 'lodash/get'
import { observer } from 'mobx-react'
import { useRouter } from 'next/navigation'
import routes from 'routes'
import { getValidArray } from 'utils/common'
import { getHeaderList } from './utils'

const TourManagement = () => {
  const { tourStore } = useStores()
  const { tours } = tourStore
  const router = useRouter()
  const pageIndex: number = 1
  const [pageSize, setPageSize] = useState<number>(10)

  const pagination: IPagination = { pageIndex, tableLength: 10, gotoPage }

  const dataInTable = getValidArray(tours).map(tour => {
    function gotoEditTourDetail(): void {
      router.push(routes.cms.tourManagement.detail.value(tour?._id))
    }

    return {
      ...tour,
      address: get(tour, 'startLocation.address', ''),
      status: tour?.isActive ? 'Active' : 'Inactive',
      actions: (
        <HStack width="86px" cursor="pointer" marginLeft="auto">
          <Icon iconName="edit.svg" size={32} onClick={gotoEditTourDetail} />
          <Icon iconName="trash.svg" size={32} />
        </HStack>
      )
    }
  
  })

  function gotoPage(page: number): void {
    // router.push(`${routes.cms.tourManagement.value}?page=${page}`)
  }

  async function handleDeleteTour(tourId: string): Promise<void> {

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
    </Box>
  )
}

export default observer(TourManagement)
