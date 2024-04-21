'use client'
import { useEffect, useState } from 'react'
import { Box, Button, HStack, Input, InputGroup, InputLeftElement, Tag, TagLabel } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import Icon from 'components/Icon'
import Table from 'components/Table'
import { useStores } from 'hooks/useStores'
import { ITransportation } from 'interfaces/transportation'
import { observer } from 'mobx-react'
import { useRouter } from 'next/navigation'
import { getValidArray } from 'utils/common'
// import TransportationForm from './TransportationForm'
import { getHeaderList } from './utils'

const TransportationManagement = () => {
  const { transportationStore } = useStores()
  const { transportations } = transportationStore
  const router = useRouter()
  const pageIndex: number = 1
  const [pageSize, setPageSize] = useState<number>(10)
  const [transportationId, setTransportationId] = useState<string>('')
  const [isOpenTransportationForm, setIsOpenTransportationForm] = useState<boolean>(false)

  const pagination = { pageIndex, tableLength: 10, gotoPage }

  const dataInTable = getValidArray(transportations).map(transportation => {
    const statusTagColor = transportation?.isActive ? 'green' : 'red'

    function onClickEditTransportation(): void {
      setIsOpenTransportationForm(true)
      setTransportationId(transportation?._id ?? '')
    }

    return {
      ...transportation,
      status: (
        <Tag variant="outline" colorScheme={statusTagColor} background={`${statusTagColor}.50`}>
          <TagLabel>{transportation?.isActive ? 'Active' : 'Disable'}</TagLabel>
        </Tag>
      ),
      actions: (
        <HStack width="86px" cursor="pointer" marginLeft="auto">
          <Icon iconName="edit.svg" size={32} onClick={onClickEditTransportation} />
          <Icon iconName="trash.svg" size={32} />
        </HStack>
      )
    }
  })

  function gotoPage(page: number): void {}

  useEffect(() => {
    transportationStore.fetchAllTransportations()
  }, [])

  return (
    <Box paddingX={{ base: 6, lg: 8 }} paddingY={6}>
      <HStack justify="space-between" spacing={4} marginBottom={6}>
        <InputGroup borderRadius="6px" maxWidth="400px" background="white">
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.400" />
          </InputLeftElement>
          <Input
            type="search"
            placeholder="Search transportation by name"
            // onChange={changeName}
          />
        </InputGroup>
        <Button
          colorScheme="teal"
          onClick={() => {
            setTransportationId('')
            setIsOpenTransportationForm(true)
          }}
        >
          Create New Transportation
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
      {/* <TransportationForm transportationId={transportationId} isOpen={isOpenTransportationForm} onClose={() => setIsOpenTransportationForm(false)} /> */}
    </Box>
  )
}

export default observer(TransportationManagement)
