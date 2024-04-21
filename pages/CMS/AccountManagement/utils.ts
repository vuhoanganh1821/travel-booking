import { ITableHeader } from 'components/Table'

export function getHeaderList(): ITableHeader[] {
  return [
    {
      Header: '',
      accessor: 'avatar',
    },
    {
      Header: 'FULL NAME',
      accessor: 'fullname',
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
    },
    {
      Header: 'LAST LOGIN',
      accessor: 'lastLogin',
    },
    {
      Header: '',
      accessor: 'actions',
    }
  ]
}