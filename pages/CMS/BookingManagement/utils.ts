import { ITableHeader } from 'components/Table'
import { EBookingStatus } from 'enums/booking'

export function getHeaderList(): ITableHeader[] {
  return [
    {
      Header: 'BOOKING NAME',
      accessor: 'personalInfo.name',
    },
    {
      Header: 'PHONE NUMBER',
      accessor: 'personalInfo.phone',
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

export function getStatusColor(status: string): string {
  if (status === EBookingStatus.PENDING) {
    return 'yellow'
  }
  if (status === EBookingStatus.COMPLETED) {
    return 'green'
  }
  if (status === EBookingStatus.CANCELLED) {
    return 'red'
  }
  return 'blue'
}
