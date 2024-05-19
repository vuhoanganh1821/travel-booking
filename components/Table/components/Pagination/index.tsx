import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Button, Flex, Text, Box, Icon } from '@chakra-ui/react'
import isNaN from 'lodash/isNaN'
import { IPagination } from 'components/Table'
import { truncatePagination } from './utils'

export interface IPaginationProps {
  pagination: IPagination
  pageSize: number
  setPageSize: (page: number) => void
  showPageSize?: boolean
  showGoToPage?: boolean
}

const Pagination = (props: IPaginationProps) => {
  const { pagination, pageSize, setPageSize, showPageSize = true, showGoToPage = false } = props
  const { gotoPage, pageIndex, tableLength } = pagination
  const isMobile: boolean = false

  const numberOfPages: number = Math.ceil(tableLength / pageSize)

  const truncatedPagination: string[] = truncatePagination(Number(pageIndex), Number(numberOfPages))

  function goPreviousPage(): void {
    gotoPage(Number(pageIndex) - 1)
  }

  function goNextPage(): void {
    gotoPage(Number(pageIndex) + 1)
  }

  return (
    <Flex justifyContent={{ base: 'center', md: 'space-between' }} hidden={numberOfPages < 1} flexWrap="nowrap">
      <Box gap={2} marginLeft={showGoToPage ? 'auto' : 0}>
        <Button
          colorScheme="gray"
          variant="outline"
          background={{ base: 'teal.500', md: 'gray.50' }}
          borderColor="gray.300"
          paddingX={{ base: 6, md: 2 }}
          marginRight={{ base: 0, md: 2 }}
          isDisabled={pageIndex === 1}
          onClick={goPreviousPage}
          color={{ base: 'white', md: 'gray.800' }}
          _hover={{ backgroundColor: { base: 'teal.600', md: 'unset' } }}
        >
          {!isMobile ? <Icon width={6} height={6} as={ChevronLeftIcon} /> : 'Prev'}
        </Button>
        {!isMobile &&
          Array.isArray(truncatedPagination) &&
          truncatedPagination.map((item: string, index: number) => {
            if (isNaN(item)) {
              return <Text key={index}>{item}</Text>
            }
            const isActive = pageIndex === Number(item)
            return (
              <Button
                colorScheme={isActive ? 'teal' : 'gray'}
                variant={isActive ? 'solid' : 'outline'}
                background={!isActive ? 'gray.50' : 'teal'}
                borderColor="gray.300"
                padding={2}
                marginRight={2}
                lineHeight={1.5}
                key={`pagination-${index}`}
                onClick={() => (isActive || item === '...' ? {} : gotoPage(Number(item)))}
                cursor={isActive || item === '...' ? 'default' : 'pointer'}
              >
                {item}
              </Button>
            )
          })}
        <Button
          colorScheme="gray"
          variant="outline"
          paddingX={{ base: 6, md: 2 }}
          marginLeft={{ base: 4, md: 0 }}
          background={{ base: 'teal.500', md: 'gray.50' }}
          borderColor="gray.300"
          isDisabled={pageIndex === numberOfPages}
          onClick={goNextPage}
          color={{ base: 'white', md: 'gray.800' }}
          _hover={{ backgroundColor: { base: 'teal.600', md: 'unset' } }}
        >
          {!isMobile ? <Icon width={6} height={6} as={ChevronRightIcon} /> : 'Next'}
        </Button>
      </Box>
    </Flex>
  )
}

export default Pagination
