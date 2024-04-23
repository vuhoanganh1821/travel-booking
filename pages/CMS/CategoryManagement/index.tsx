'use client'
import { useEffect, useState } from 'react'
import { Box, Button, HStack, Input, InputGroup, InputLeftElement, Tag, TagLabel } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import Icon from 'components/Icon'
import Table from 'components/Table'
import { useStores } from 'hooks/useStores'
import { ICategory } from 'interfaces/category'
import debounce from 'lodash/debounce'
import { observer } from 'mobx-react'
import { useRouter } from 'next/navigation'
import { getValidArray } from 'utils/common'
import CategoryForm from './CategoryForm'
import { getHeaderList } from './utils'

const CategoryManagement = () => {
  const { categoryStore } = useStores()
  const { categories } = categoryStore
  const router = useRouter()
  const pageIndex: number = 1
  const [pageSize, setPageSize] = useState<number>(10)
  const [category, setCategory] = useState<ICategory>()
  const [searchText, setSearchText] = useState<string>('')
  const [isOpenCategoryForm, setIsOpenCategoryForm] = useState<boolean>(false)

  const pagination = { pageIndex, tableLength: 10, gotoPage }

  const dataInTable = getValidArray(categories).map(category => {
    const statusTagColor = category?.isActive ? 'green' : 'red'

    function onClickEditCategory(): void {
      setCategory(category)
      setIsOpenCategoryForm(true)
    }

    return {
      ...category,
      type: (
        <Tag variant="outline" colorScheme={statusTagColor} background={`${statusTagColor}.50`}>
          <TagLabel>{category?.isActive ? 'Active' : 'Disable'}</TagLabel>
        </Tag>
      ),
      actions: (
        <HStack width="86px" cursor="pointer" marginLeft="auto">
          <Icon iconName="edit.svg" size={32} onClick={onClickEditCategory} />
          <Icon iconName="trash.svg" size={32} />
        </HStack>
      )
    }
  })

  function gotoPage(page: number): void {}

  useEffect(() => {
    if (searchText) {
    } else {
      categoryStore.fetchAllCategories()
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
            placeholder="Search category by name"
            onChange={(event) => debounceSearch(event?.target?.value)}
          />
        </InputGroup>
        <Button
          colorScheme="teal"
          onClick={() => {
            setCategory(undefined)
            setIsOpenCategoryForm(true)
          }}
        >
          Create New Category
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
      <CategoryForm category={category} isOpen={isOpenCategoryForm} onClose={() => setIsOpenCategoryForm(false)} />
    </Box>
  )
}

export default observer(CategoryManagement)
