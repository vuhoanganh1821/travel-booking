import React, { Fragment } from 'react'
import { Table as CkTable, Thead, Tbody, Tr, Th, Td, Box, Stack } from '@chakra-ui/react'
import { EAlignEnum } from 'enums/common'
import { EBreakPoint } from 'enums/theme'
import useBreakPoint from 'hooks/useBreakPoint'
import { useStores } from 'hooks/useStores'
import get from 'lodash/get'
import update from 'lodash/update'
import { observer } from 'mobx-react-lite'
import Skeleton from 'react-loading-skeleton'
import { useTable, useExpanded, useSortBy, Column } from 'react-table'
import Icon from 'components/Icon'
import Pagination from '../../components/Pagination'
import { ITableProps, IRowSpanHeader } from './types'

function useInstance(instance: { allColumns: any }) {
  const { allColumns } = instance
  let rowSpanHeaders: IRowSpanHeader[] = []
  allColumns.forEach((column: { id: string; enableRowSpan: boolean }) => {
    const { id, enableRowSpan } = column
    if (enableRowSpan !== undefined) {
      rowSpanHeaders = [...rowSpanHeaders, { id, topCellValue: null, topCellIndex: 0 }]
    }
  })
  Object.assign(instance, { rowSpanHeaders })
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
    isSmallSize
  } = props
  const isDesktop: boolean = useBreakPoint(EBreakPoint.LG)
  const columns: Column<object>[] = (React.useMemo(() => headerList, [headerList]) || []) as Column<object>[]
  const { spinnerStore } = useStores()
  const { isLoading } = spinnerStore
  const instanceTable = useTable(
    {
      columns,
      data: tableData
    },
    (hooks) => {
      hooks.useInstance.push(useInstance)
    },
    useSortBy,
    useExpanded
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, visibleColumns } = instanceTable
  const rowSpanHeaders: IRowSpanHeader[] = get(instanceTable, 'rowSpanHeaders', [])
  const paginationComponent =
    includePagination && pageSize && setPageSize ? (
      <Pagination pagination={pagination} pageSize={pageSize} setPageSize={setPageSize} />
    ) : null

  return (
    <Stack spacing="24px">
      <Box padding={3} borderRadius="12px" border="1px solid white" background="white" overflow="auto" width="100%">
        <CkTable {...getTableProps()} variant="simple" colorScheme="gray" outline="none" position="relative">
          <Thead display={hideHeader ? 'none' : 'table-header-group'} className="thead">
            {headerGroups.map((headerGroup) => {
              const { key, ...restHeaderGroup } = headerGroup.getHeaderGroupProps()
              return (
                <Tr key={`tr-${key}`} {...restHeaderGroup}>
                  {headerGroup.headers.map((column: any) => {
                    const align: EAlignEnum = get(column, 'align', EAlignEnum.LEFT) || EAlignEnum.LEFT
                    const { key: colKey } = column.getHeaderProps()
                    const columnHeaderProps = column.Header
                      ? column.getHeaderProps(column.getSortByToggleProps)
                      : column.getHeaderProps()
                    return (
                      <Th
                        key={`th-${colKey}`}
                        {...columnHeaderProps}
                        whiteSpace="nowrap"
                        paddingY={isSmallSize ? 3 : 5}
                        borderBottomWidth="0"
                        textAlign={align}
                      >
                        {column.render('Header')}
                        &nbsp;
                        {hasNoSort ? (
                          ''
                        ) : (
                          <span>
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <Icon iconName="three-lines.svg" size={12} />
                              ) : (
                                <Icon iconName="three-lines.svg" size={12} className="icon--rotate" />
                              )
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
            {rows.map((row, i) => {
              prepareRow(row)
              if (isDesktop) {
                for (let j = 0; j < row.allCells.length; j++) {
                  let cell = row.allCells[j]
                  let rowSpanHeader = rowSpanHeaders.find((x: IRowSpanHeader) => x.id === cell.column.id)
                  if (rowSpanHeader !== undefined) {
                    if (rowSpanHeader.topCellValue === null || rowSpanHeader.topCellValue !== cell.value) {
                      update(cell, 'isRowSpanned', () => false)
                      rowSpanHeader.topCellValue = cell.value
                      rowSpanHeader.topCellIndex = i
                      update(cell, 'rowSpan', () => 1)
                    } else {
                      const currentCell = rows[rowSpanHeader.topCellIndex].allCells[j]
                      update(currentCell, 'rowSpan', (rowSpan) => rowSpan + 1)
                      update(cell, 'isRowSpanned', () => true)
                    }
                  }
                }
              }
              return null
            })}
            {rows.map((row, index: number) => {
              const isExpanded = get(row, 'isExpanded', false)
              const isBold: boolean = get(row, 'original.isBold', false)
              const isHightLight: boolean = get(row, 'original.isHightLight', false)
              return (
                <Fragment key={`row-${index}`}>
                  {isLoading && <Skeleton height={48} className="skeleton" />}
                  {isLoading && <Tr height={8}></Tr>}
                  <Tr
                    {...row.getRowProps()}
                    className={isExpanded ? 'expanded' : 'normal'}
                    fontWeight={isBold ? 'bold' : '500'}
                    backgroundColor={isHightLight ? '#E6FFFA !important' : undefined}
                    marginBottom={isHightLight ? 4 : 0}
                    display={isLoading ? 'none' : 'table-row'}
                  >
                    {row.cells.map((cell) => {
                      const { key, ...restCell } = cell.getCellProps()
                      const align: EAlignEnum = get(cell, 'column.align', EAlignEnum.LEFT) || EAlignEnum.LEFT
                      const isExpandCell = cell.column.id === 'isExpand'
                      const isMergedCell = get(cell, 'column.enableRowSpan')
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
                      if (get(cell, 'isRowSpanned')) return null
                      const rowSpanNumber: number = get(cell, 'rowSpan', 1) || 1
                      if (isDesktop && rowSpanNumber > 1) {
                        return (
                          <Td
                            key={key}
                            className="white-background-cell"
                            rowSpan={rowSpanNumber}
                            {...restCell}
                            textAlign={align}
                          >
                            {cell.render('Cell')}
                          </Td>
                        )
                      }
                      return (
                        <Td
                          {...restCell}
                          key={key}
                          textAlign={align}
                          className={isMergedCell ? 'white-background-cell' : ''}
                        >
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
                      <Tr background={'teal.50'}>
                        <Td colSpan={visibleColumns.length} borderBottomWidth="0">
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
