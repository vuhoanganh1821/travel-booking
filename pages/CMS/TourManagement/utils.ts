import { ITableHeader } from 'components/Table'
import { ITour } from 'interfaces/tour'
import { getValidArray } from 'utils/common'
import { IUpdateTourForm } from './UpdateTourDetail'

export function getHeaderList(): ITableHeader[] {
  return [
    {
      Header: 'IMAGE',
      accessor: 'thumbnail',
    },
    {
      Header: 'CODE',
      accessor: 'code',
    },
    {
      Header: 'TITLE',
      accessor: 'title',
    },
    {
      Header: 'REGULAR PRICE',
      accessor: 'regularPrice',
    },
    {
      Header: 'STATUS',
      accessor: 'status',
    },
    {
      Header: '',
      accessor: 'actions',
    }
  ]
}

export function formatFormData(formData: IUpdateTourForm): ITour {
  return {
    ...formData,
    images: getValidArray(formData?.images),
    regularPrice: Number(formData?.regularPrice),
  }
}
