'use client'
import { useEffect, useState } from 'react'
import { Box, Button, HStack, Input, InputGroup, InputLeftElement, Text, Tag, TagLabel } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { deleteCategory } from 'API/category'
import ConfirmModal from 'components/ConfirmModal'
import Icon from 'components/Icon'
import Table from 'components/Table'
import { useStores } from 'hooks/useStores'
import { ICategory } from 'interfaces/category'
import debounce from 'lodash/debounce'
import { observer } from 'mobx-react'
import { useRouter } from 'next/navigation'
import { getValidArray } from 'utils/common'
import { toast } from 'react-toastify'
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
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [isOpenCategoryForm, setIsOpenCategoryForm] = useState<boolean>(false)

  const pagination = { pageIndex, tableLength: 10, gotoPage }

  const dataInTable = getValidArray(categories).map(category => {
    const statusTagColor = category?.isActive ? 'green' : 'red'

    function onClickEditCategory(): void {
      setCategory(category)
      setIsOpenCategoryForm(true)
    }

    function onClickDeleteCategory(): void {
      setIsDeleting(true)
      setCategory(category)
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
          <Icon iconName="trash.svg" size={32} onClick={onClickDeleteCategory} />
        </HStack>
      )
    }
  })

  function gotoPage(page: number): void {}

  async function handleDeleteCategory(): Promise<void> {
    try {
      if (category?._id) {
        await deleteCategory(category?._id)
        await categoryStore.fetchAllCategories()
        toast.success('Delete category successfully')
      }
    } catch (error) {
      toast.error('Delete category failed')
    }
  }

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
      <ConfirmModal
        titleText="Delete Category"
        bodyText={<Text>Are you sure to delete this category?{<br />}This action can not be undo</Text>}
        cancelButtonText="No, keep this category"
        confirmButtonText="Yes, delete"
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onClickAccept={handleDeleteCategory}
      />
    </Box>
  )
}

export default observer(CategoryManagement)
