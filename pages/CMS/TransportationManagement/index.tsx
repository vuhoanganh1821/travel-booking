'use client'
import { useEffect, useState } from 'react'
import { Box, Button, HStack, Img, Input, InputGroup, InputLeftElement, Tag, TagLabel, Text } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { deleteTransportation } from 'API/transportation'
import ConfirmModal from 'components/ConfirmModal'
import Icon from 'components/Icon'
import Table from 'components/Table'
import { useStores } from 'hooks/useStores'
import { ITransportation } from 'interfaces/transportation'
import { observer } from 'mobx-react'
import { useRouter } from 'next/navigation'
import { getValidArray } from 'utils/common'
import TransportationForm from './TransportationForm'
import { getHeaderList } from './utils'
import { toast } from 'react-toastify'

const TransportationManagement = () => {
  const { transportationStore } = useStores()
  const { transportations } = transportationStore
  const router = useRouter()
  const pageIndex: number = 1
  const [pageSize, setPageSize] = useState<number>(10)
  const [transportation, setTransportation] = useState<ITransportation>()
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [isOpenTransportationForm, setIsOpenTransportationForm] = useState<boolean>(false)

  const pagination = { pageIndex, tableLength: 10, gotoPage }

  const dataInTable = getValidArray(transportations).map(transportation => {
    const statusTagColor = transportation?.isActive ? 'green' : 'red'

    function onClickEditTransportation(): void {
      setIsOpenTransportationForm(true)
      setTransportation(transportation)
    }

    function onClickDeleteTransportation(): void {
      setIsDeleting(true)
      setTransportation(transportation)
    }

    return {
      ...transportation,
      status: (
        <Tag variant="outline" colorScheme={statusTagColor} background={`${statusTagColor}.50`}>
          <TagLabel>{transportation?.isActive ? 'Active' : 'Disable'}</TagLabel>
        </Tag>
      ),
      image: transportation?.image && <Img boxSize={10} src={transportation?.image} borderRadius={8} />,
      actions: (
        <HStack width="86px" cursor="pointer" marginLeft="auto">
          <Icon iconName="edit.svg" size={32} onClick={onClickEditTransportation} />
          <Icon iconName="trash.svg" size={32} onClick={onClickDeleteTransportation} />
        </HStack>
      )
    }
  })

  function gotoPage(page: number): void {}

  async function handleDeleteTransportation(): Promise<void> {
    try {
      if (transportation?._id) {
        await deleteTransportation(transportation?._id)
        await transportationStore.fetchAllTransportations()
        toast.success('Delete transportation successfully')
      }
    } catch (error) {
      toast.error('Delete transportation failed')
    }
  }

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
            setTransportation(undefined)
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
      <TransportationForm
        transportation={transportation}
        isOpen={isOpenTransportationForm}
        onClose={() => setIsOpenTransportationForm(false)}
      />
      <ConfirmModal
        titleText="Delete Transportation"
        bodyText={<Text>Are you sure to delete this transportation?{<br />}This action can not be undo</Text>}
        cancelButtonText="No, keep this transportation"
        confirmButtonText="Yes, delete"
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onClickAccept={handleDeleteTransportation}
      />
    </Box>
  )
}

export default observer(TransportationManagement)
