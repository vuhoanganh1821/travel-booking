'use client'
import { useEffect, useState } from 'react'
import { Box, Button, HStack, Input, InputGroup, InputLeftElement, Tag, TagLabel } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import Icon from 'components/Icon'
import Table from 'components/Table'
import { useStores } from 'hooks/useStores'
import { ILocation } from 'interfaces/location'
import capitalize from 'lodash/capitalize'
import debounce from 'lodash/debounce'
import { observer } from 'mobx-react'
import { useRouter } from 'next/navigation'
import { getValidArray } from 'utils/common'
// import LocationForm from './LocationForm'
import { getHeaderList } from './utils'

const LocationManagement = () => {
  const { locationStore } = useStores()
  const { locations } = locationStore
  const router = useRouter()
  const pageIndex: number = 1
  const [pageSize, setPageSize] = useState<number>(10)
  const [locationId, setLocationId] = useState<string>('')
  const [searchText, setSearchText] = useState<string>('')
  const [isOpenLocationForm, setIsOpenLocationForm] = useState<boolean>(false)

  const pagination = { pageIndex, tableLength: 10, gotoPage }

  const dataInTable = getValidArray(locations).map(location => {
    const statusTagColor = location?.type === 'city' ? 'red' : 'blue'

    function onClickEditLocation(): void {
      setIsOpenLocationForm(true)
      setLocationId(location?._id ?? '')
    }

    return {
      ...location,
      type: (
        <Tag variant="outline" colorScheme={statusTagColor} background={`${statusTagColor}.50`}>
          <TagLabel>{capitalize(location?.type)}</TagLabel>
        </Tag>
      ),
      actions: (
        <HStack width="86px" cursor="pointer" marginLeft="auto">
          <Icon iconName="edit.svg" size={32} onClick={onClickEditLocation} />
          <Icon iconName="trash.svg" size={32} />
        </HStack>
      )
    }
  })

  function gotoPage(page: number): void {}

  useEffect(() => {
    if (searchText) {
      locationStore.fetchSearchLocations(searchText)
    } else {
      locationStore.fetchAllLocations()
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
            placeholder="Search location by title"
            onChange={(event) => debounceSearch(event?.target?.value)}
          />
        </InputGroup>
        <Button
          colorScheme="teal"
          onClick={() => {
            setLocationId('')
            setIsOpenLocationForm(true)
          }}
        >
          Create New Location
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
      {/* <LocationForm locationId={locationId} isOpen={isOpenLocationForm} onClose={() => setIsOpenLocationForm(false)} /> */}
    </Box>
  )
}

export default observer(LocationManagement)
