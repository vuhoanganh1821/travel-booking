'use client'
import { useEffect, useState } from 'react'
import { Box, Button, HStack, Img, Input, InputGroup, InputLeftElement, Tag, TagLabel, Text } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { deleteLocation } from 'API/location'
import ConfirmModal from 'components/ConfirmModal'
import Icon from 'components/Icon'
import Table from 'components/Table'
import { useStores } from 'hooks/useStores'
import { ILocation } from 'interfaces/location'
import capitalize from 'lodash/capitalize'
import debounce from 'lodash/debounce'
import { observer } from 'mobx-react'
import { getValidArray } from 'utils/common'
import LocationForm from './LocationForm'
import { getHeaderList } from './utils'
import { toast } from 'react-toastify'

const LocationManagement = () => {
  const { locationStore } = useStores()
  const { locations } = locationStore
  const pageIndex: number = 1
  const [pageSize, setPageSize] = useState<number>(10)
  const [location, setLocation] = useState<ILocation>()
  const [searchText, setSearchText] = useState<string>('')
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [isOpenLocationForm, setIsOpenLocationForm] = useState<boolean>(false)

  const pagination = { pageIndex, tableLength: 10, gotoPage }

  const dataInTable = getValidArray(locations).map(location => {
    const statusTagColor = location?.type === 'city' ? 'red' : 'blue'

    function onClickEditLocation(): void {
      setIsOpenLocationForm(true)
      setLocation(location)
    }

    function onClickDeleteLocation(): void {
      setIsDeleting(true)
      setLocation(location)
    }

    return {
      ...location,
      longitude: location?.loc?.coordinates[0],
      latitude: location?.loc?.coordinates[1],
      type: (
        <Tag variant="outline" colorScheme={statusTagColor} background={`${statusTagColor}.50`}>
          <TagLabel>{capitalize(location?.type)}</TagLabel>
        </Tag>
      ),
      thumbnail: location?.thumbnail && <Img boxSize={10} src={location?.thumbnail} borderRadius={8} />,
      actions: (
        <HStack width="86px" cursor="pointer" marginLeft="auto">
          <Icon iconName="edit.svg" size={32} onClick={onClickEditLocation} />
          <Icon iconName="trash.svg" size={32} onClick={onClickDeleteLocation} />
        </HStack>
      )
    }
  })

  function gotoPage(page: number): void {}

  async function handleDeleteLocation(): Promise<void> {
    try {
      if (location?._id) {
        await deleteLocation(location?._id)
        await locationStore.fetchAllLocations()
        toast.success('Delete location successfully')
      }
    } catch (error) {
      toast.error('Delete location failed')
    }
  }

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
            setLocation(undefined)
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
      <LocationForm location={location} isOpen={isOpenLocationForm} onClose={() => setIsOpenLocationForm(false)} />
      <ConfirmModal
        titleText="Delete Location"
        bodyText={<Text>Are you sure to delete this location?{<br />}This action can not be undo</Text>}
        cancelButtonText="No, keep this location"
        confirmButtonText="Yes, delete"
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onClickAccept={handleDeleteLocation}
      />
    </Box>
  )
}

export default observer(LocationManagement)
