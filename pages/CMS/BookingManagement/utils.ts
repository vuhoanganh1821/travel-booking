import { ITableHeader } from 'components/Table'

export function getHeaderList(): ITableHeader[] {
  return [
    {
      Header: 'NAME',
      accessor: 'username',
    },
    {
      Header: 'EMAIL',
      accessor: 'email',
    },
    {
      Header: 'ROLE',
      accessor: 'role',
    },
    {
      Header: 'STATUS',
      accessor: 'status',
    }
  ]
}