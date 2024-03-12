import { ReactNode } from 'react'
import { Row, UseExpandedRowProps } from 'react-table'

export interface ExpandableCellProps {
  row: Row & UseExpandedRowProps<Row>
  value: ReactNode
}

const ExpandableCell = (props: ExpandableCellProps) => {
  const { row, value } = props
  return <span {...row.getToggleRowExpandedProps()}>{value}</span>
}

export default ExpandableCell
