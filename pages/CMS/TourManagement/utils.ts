import { ITableHeader } from 'components/Table'

export function getHeaderList(): ITableHeader[] {
  return [
    {
      Header: 'CODE',
      accessor: 'code',
    },
    {
      Header: 'NAME',
      accessor: 'title',
    },
    {
      Header: 'ADDRESS',
      accessor: 'address',
    },
    {
      Header: 'REGULAR PRICE',
      accessor: 'regularPrice',
    },
    {
      Header: 'STATUS',
      accessor: 'status',
    }
  ]
}