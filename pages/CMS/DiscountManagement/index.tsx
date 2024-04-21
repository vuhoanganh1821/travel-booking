'use client'
import { useEffect, useState } from 'react'
import { Box, Button, HStack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import Icon from 'components/Icon'
import Table from 'components/Table'
import dayjs from 'dayjs'
import { useStores } from 'hooks/useStores'
import { IDiscount } from 'interfaces/discount'
import { observer } from 'mobx-react'
import { useRouter } from 'next/navigation'
import { getValidArray } from 'utils/common'
import DiscountForm from './DiscountForm'
import { getHeaderList } from './utils'

const DiscountManagement = () => {
  const { discountStore } = useStores()
  const { discounts } = discountStore
  const router = useRouter()
  const pageIndex: number = 1
  const [pageSize, setPageSize] = useState<number>(10)
  const [discountId, setDiscountId] = useState<string>('')
  const [isOpenDiscountForm, setIsOpenDiscountForm] = useState<boolean>(false)

  const pagination = { pageIndex, tableLength: 10, gotoPage }

  const dataInTable = getValidArray(discounts).map(discount => {
    function onClickEditDiscount(): void {
      setIsOpenDiscountForm(true)
      setDiscountId(discount?._id ?? '')
    }
    return {
      ...discount,
      startDate: dayjs(discount?.startDate).format('DD/MM/YYYY'),
      endDate: dayjs( discount?.endDate).format('DD/MM/YYYY'),
      actions: (
        <HStack width="86px" cursor="pointer" marginLeft="auto">
          <Icon iconName="edit.svg" size={32} onClick={onClickEditDiscount} />
          <Icon iconName="trash.svg" size={32} />
        </HStack>
      )
    }
  })

  function gotoPage(page: number): void {}

  useEffect(() => {
    discountStore.fetchAllDiscounts()
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
            placeholder="Search discount by name"
            // onChange={changeName}
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
    </Box>
  )
}

export default observer(DiscountManagement)
