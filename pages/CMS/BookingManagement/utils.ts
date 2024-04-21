import { ITableHeader } from 'components/Table'

export function getHeaderList(): ITableHeader[] {
  return [
    {
      Header: 'NAME',
      accessor: 'user.username',
    },
    {
      Header: 'EMAIL',
      accessor: 'user.email',
    },
    {
      Header: 'TOTAL ORDER',
      accessor: 'checkoutOrder.totalOrder',
    },
    {
      Header: 'TOTAL PRICE',
      accessor: 'checkoutOrder.totalPrice',
    },
    {
      Header: 'STATUS',
      accessor: 'status',
    },
    {
      Header: '',
      accessor: 'actions',
    },
  ]
}