'use client'
import { useEffect, useState } from 'react'
import { Box, Button, HStack, Input, InputGroup, InputLeftElement, Tag, TagLabel, Text } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { deleteDiscount } from 'API/discount'
import ConfirmModal from 'components/ConfirmModal'
import Icon from 'components/Icon'
import Table from 'components/Table'
import dayjs from 'dayjs'
import { EDiscountAppliesTo, EDiscountType } from 'enums/discount'
import { useStores } from 'hooks/useStores'
import { IDiscount } from 'interfaces/discount'
import capitalize from 'lodash/capitalize'
import debounce from 'lodash/debounce'
import { observer } from 'mobx-react'
import { useRouter } from 'next/navigation'
import { getValidArray } from 'utils/common'
import DiscountForm from './DiscountForm'
import { getHeaderList } from './utils'
import { toast } from 'react-toastify'

const DiscountManagement = () => {
  const { discountStore, tourStore } = useStores()
  const { discounts } = discountStore
  const router = useRouter()
  const pageIndex: number = 1
  const [pageSize, setPageSize] = useState<number>(10)
  const [discountId, setDiscountId] = useState<string>('')
  const [searchText, setSearchText] = useState<string>('')
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [isOpenDiscountForm, setIsOpenDiscountForm] = useState<boolean>(false)

  const pagination = { pageIndex, tableLength: 10, gotoPage }

  const dataInTable = getValidArray(discounts).map(discount => {
    const typeColor = discount?.type === EDiscountType.FIXED_AMOUNT ? 'red' : 'green'
    const applyColor = discount?.appliesTo === EDiscountAppliesTo.SPECIFIC ? 'blue' : 'orange'

    function onClickEditDiscount(): void {
      setIsOpenDiscountForm(true)
      setDiscountId(discount?._id ?? '')
    }

    function onClickDeleteDiscount(): void {
      setIsDeleting(true)
      setDiscountId(discount?._id ?? '')
    }

    return {
      ...discount,
      startDate: dayjs(discount?.startDate).format('DD/MM/YYYY'),
      endDate: dayjs( discount?.endDate).format('DD/MM/YYYY'),
      type: (
        <Tag variant="outline" colorScheme={typeColor} background={`${typeColor}.50`}>
          <TagLabel>{capitalize(discount?.type)}</TagLabel>
        </Tag>
      ),
      appliesTo: (
        <Tag variant="outline" colorScheme={applyColor} background={`${applyColor}.50`}>
          <TagLabel>{capitalize(discount?.appliesTo)}</TagLabel>
        </Tag>
      ),
      actions: (
        <HStack width="86px" cursor="pointer" marginLeft="auto">
          <Icon iconName="edit.svg" size={32} onClick={onClickEditDiscount} />
          <Icon iconName="trash.svg" size={32} onClick={onClickDeleteDiscount} />
        </HStack>
      )
    }
  })

  function gotoPage(page: number): void {}

  async function handleDeleteDiscount(): Promise<void> {
    try {
      if (discountId) {
        await deleteDiscount(discountId)
        await discountStore.fetchAllDiscounts()
        toast.success('Delete discount successfully')
      }
    } catch (error) {
      toast.error('Delete discount failed')
    }
  }

  useEffect(() => {
    if (searchText) {
      discountStore.fetchSearchDiscounts(searchText)
    } else {
      discountStore.fetchAllDiscounts()
    }
  }, [searchText])

  useEffect(() => {
    tourStore.fetchAllTours()
  }, [])

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
            placeholder="Search discount by code"
            onChange={(event) => debounceSearch(event?.target?.value)}
          />
        </InputGroup>
        <Button
          colorScheme="teal"
          onClick={() => {
            setDiscountId('')
            setIsOpenDiscountForm(true)
          }}
        >
          Create New Discount
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
      <DiscountForm discountId={discountId} isOpen={isOpenDiscountForm} onClose={() => setIsOpenDiscountForm(false)} />
      <ConfirmModal
        titleText="Delete Discount"
        bodyText={<Text>Are you sure to delete this discount?{<br />}This action can not be undo</Text>}
        cancelButtonText="No, keep this discount"
        confirmButtonText="Yes, delete"
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onClickAccept={handleDeleteDiscount}
      />
    </Box>
  )
}

export default observer(DiscountManagement)
