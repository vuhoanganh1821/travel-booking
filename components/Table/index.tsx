/* eslint-disable max-lines */
import React, { Fragment, ReactNode, useMemo } from 'react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Table as CkTable, Thead, Tbody, Tr, Th, Td, Box, Stack, Link, Text, HStack } from '@chakra-ui/react'
import { useStores } from 'hooks/useStores'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import Skeleton from 'react-loading-skeleton'
import { useTable, useExpanded, useSortBy, Column, PluginHook } from 'react-table'
import Icon from 'components/Icon'
import { getValidArray } from 'utils/common'
import { ExpandableCellProps } from './components/ExpandableCell'
import Pagination from './components/Pagination'

export interface IPagination {
  tableLength: number
  pageIndex: number
  gotoPage: (pageIndex: number) => void
}

interface ITableProps {
  tableData: any
  headerList: ITableHeader[]
  subComponent?: any
  pagination?: IPagination
  hasNoSort?: boolean
  columnWidth?: number
  isManualSort?: boolean
  pageSize?: number
  includePagination?: boolean
  setPageSize?: (page: number) => void
  hideHeader?: boolean
  bodyClass?: string
  isSmallSize?: boolean
  setSort?: (name: string) => void
  setOrderBy?: (orderBy: number) => void
  borderColor?: string
}

export declare interface ITableHeader {
  Header: string | ReactNode
  accessor?: string
  Cell?: (props: ExpandableCellProps) => ReactNode
  columns?: ITableHeader[]
  align?: EAlignEnum
  disableSortBy?: boolean
}

export enum EAlignEnum {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center'
}

const Table = (props: ITableProps) => {
  const {
    tableData,
    headerList,
    pagination = { pageIndex: 1, tableLength: 0, gotoPage: () => {} },
    hasNoSort,
    pageSize,
    setPageSize,
    subComponent,
    includePagination = true,
    hideHeader,
    bodyClass = 'tbody',
    isSmallSize,
    isManualSort,
    borderColor,
    setSort,
    setOrderBy
  } = props
  const columns: Column<object>[] = (useMemo(() => headerList, [headerList]) || []) as Column<object>[]
  const { spinnerStore } = useStores()
  const { isLoading } = spinnerStore
  const router = useRouter()
  const isEmptyTable: boolean = tableData?.length === 0
  const sortBy = useMemo(
    () => (isManualSort ? [] : [{ id: headerList[0]?.accessor ?? '', desc: false }]),
    [isManualSort]
  )
  const tablePlugins: Array<PluginHook<object>> = []
  if (!hasNoSort) {
    tablePlugins.push(useSortBy)
  }
  tablePlugins.push(useExpanded)
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, visibleColumns } = useTable(
    {
      columns,
      data: tableData,
      // initialState: {
      //   sortBy
      // },
      // autoResetSortBy: !isManualSort,
      // disableSortRemove: isManualSort,
      // manualSortBy: isManualSort
    },
    ...tablePlugins
  )
  const paginationComponent =
    includePagination && pageSize && setPageSize && !isEmptyTable ? (
      <Pagination pagination={pagination} pageSize={pageSize} setPageSize={setPageSize} />
    ) : null

  return (
    <Stack width="full" spacing="24px">
      <Box
        padding={3}
        borderRadius="12px"
        border="1px solid white"
        borderColor={borderColor}
        background="white"
        overflow="auto"
        width="100%"
      >
        <CkTable {...getTableProps()} variant="striped" colorScheme="gray" outline="none" position="relative">
          <Thead display={hideHeader ? 'none' : 'table-header-group'} className="thead">
            {headerGroups.map((headerGroup) => {
              const { key, ...restHeaderGroup } = headerGroup.getHeaderGroupProps()
              return (
                <Tr key={`tr-${key}`} {...restHeaderGroup}>
                  {headerGroup.headers.map((column: Record<string, any>) => {
                    if (isManualSort && column?.isSorted) {
                      setSort && setSort(column?.id)
                      setOrderBy && setOrderBy(column.isSortedDesc ? -1 : 1)
                    }
                    const align: EAlignEnum = get(column, 'align', EAlignEnum.LEFT) || EAlignEnum.LEFT
                    const { key: colKey, ...colProps } = column.getHeaderProps(
                      column?.Header ? column.getSortByToggleProps : undefined
                    )
                    return (
                      <Th
                        key={`th-${colKey}`}
                        {...colProps}
                        whiteSpace="nowrap"
                        paddingY={isSmallSize ? 3 : 5}
                        borderBottomWidth="0"
                        textAlign={align}
                      >
                        {column.render('Header')}
                        &nbsp;
                        {hasNoSort || column?.disableSortBy ? (
                          ''
                        ) : (
                          <span>
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <TriangleDownIcon width={2} height={2} />
                              ) : (
                                <TriangleUpIcon width={2} height={2} />
                              )
                            ) : column.Header ? (
                              <Icon iconName="three-lines.svg" size={12} />
                            ) : null}
                          </span>
                        )}
                      </Th>
                    )
                  })}
                </Tr>
              )
            })}
          </Thead>
          <Tbody {...getTableBodyProps()} color="gray.700" fontWeight="500" fontSize="sm" className={bodyClass}>
            {rows.map((row, index: number) => {
              prepareRow(row)
              const isExpanded = get(row, 'isExpanded', false)
              const isBold: boolean = get(row, 'original.isBold', false)
              const isHightLight: boolean | undefined = get(row, 'original.isHightLight')
              const backGroundColor: string = isHightLight ? '#E6FFFA !important' : 'unset !important'
              return (
                <Fragment key={`row-${index}`}>
                  {isLoading && <Skeleton height={48} className="skeleton" />}
                  {isLoading && <Tr height={8}></Tr>}
                  <Tr
                    {...row.getRowProps()}
                    className={isExpanded ? 'expanded' : 'normal'}
                    fontWeight={isBold ? 'bold' : '500'}
                    backgroundColor={isHightLight !== undefined ? backGroundColor : undefined}
                    marginBottom={isHightLight ? 4 : 0}
                    display={isLoading ? 'none' : 'table-row'}
                  >
                    {row.cells.map((cell) => {
                      const { key, ...restCell } = cell.getCellProps()
                      const align: EAlignEnum = get(cell, 'column.align', EAlignEnum.LEFT) || EAlignEnum.LEFT
                      const isExpandCell = cell.column.id === 'isExpand'
                      if (isExpandCell) {
                        return (
                          <Td
                            {...restCell}
                            key={key}
                            borderBottomWidth="0"
                            width="48px"
                            paddingX="14px"
                            className="expand-icon"
                          >
                            <Icon
                              iconName={isExpanded ? 'expand_row.svg' : 'collapse_row.svg'}
                              size={20}
                              // @ts-ignore //* INFO: react-table-v6 missing this prop interface
                              {...row.getToggleRowExpandedProps()}
                            />
                          </Td>
                        )
                      }
                      if (cell.column.Header === 'Link To Lease') {
                        return (
                          <Td {...restCell} key={key} borderBottomWidth="0" textAlign={align}>
                            <Link href={cell.value} color="teal.500" isExternal>
                              <HStack justifyContent={{ base: 'center', lg: 'flex-end' }}>
                                <Text fontSize={{ base: '0', lg: 'sm' }} lineHeight="20px"></Text>
                                <ExternalLinkIcon marginX="2px" fontSize="20px" />
                              </HStack>
                            </Link>
                          </Td>
                        )
                      }
                      if (cell.column.Header === 'TENANT LEASE') {
                        return (
                          <Td {...restCell} key={key} borderBottomWidth="0" textAlign={align}>
                            <Link href={cell.value} color="teal.500" isExternal>
                              <Text
                                fontWeight="500"
                                fontSize="sm"
                                lineHeight="20px"
                                color="teal.500"
                                maxWidth={{ base: '140px', md: '140px', lg: '20vw' }}
                                isTruncated
                                paddingX={2}
                              >
                                {cell.render('Cell')}
                              </Text>
                            </Link>
                          </Td>
                        )
                      }
                      return (
                        <Td {...restCell} key={key} borderBottomWidth="0" textAlign={align}>
                          {cell.render('Cell')}
                        </Td>
                      )
                    })}
                  </Tr>
                  {!isLoading && isHightLight && isBold && (
                    <Tr>
                      <Td padding={2}></Td>
                    </Tr>
                  )}
                  {!isLoading &&
                    subComponent &&
                    (get(row, 'isExpanded', false) ? (
                      <Tr background="teal.50">
                        <Td
                          colSpan={visibleColumns.length}
                          borderBottomWidth="0"
                          paddingTop="0px !important"
                          paddingBottom="16px !important"
                        >
                          {subComponent(row)}
                        </Td>
                      </Tr>
                    ) : (
                      <Tr display="none"></Tr>
                    ))}
                </Fragment>
              )
            })}
          </Tbody>
        </CkTable>
      </Box>
      {paginationComponent}
    </Stack>
  )
}

export default observer(Table)
