import { ReactNode } from 'react'
import { EAlignEnum } from 'enums/common'
import { ExpandableCellProps } from 'components/Table/components/ExpandableCell'

export interface IPagination {
  tableLength: number
  pageIndex: number
  gotoPage: (pageIndex: number) => void
}
export interface ITableProps {
  tableData: any
  headerList: ITableHeader[]
  subComponent?: any
  pagination?: IPagination
  hasNoSort?: boolean
  columnWidth?: number
  isManualSort?: boolean
  setSort?: (name: string) => void
  setOrderBy?: (orderBy: number) => void
  pageSize?: number
  includePagination?: boolean
  setPageSize?: (page: number) => void
  hideHeader?: boolean
  bodyClass?: string
  isSmallSize?: boolean
}
export declare interface ITableHeader {
  Header: string | ReactNode
  accessor?: string
  Cell?: (props: ExpandableCellProps) => ReactNode
  columns?: ITableHeader[]
  align?: EAlignEnum
  enableRowSpan?: boolean
}

export type IRowSpanHeader = {
  id: string
  topCellValue: string | null
  topCellIndex: number
}
