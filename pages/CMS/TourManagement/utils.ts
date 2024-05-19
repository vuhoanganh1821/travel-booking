import { ITableHeader } from 'components/Table'
import { IPriceOption } from 'interfaces/common'
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

export function formatFormData(formData: IUpdateTourForm, priceOptions: IPriceOption[]): ITour {
  return {
    _id: formData?._id,
    highlights: formData?.highlights,
    type: formData?.type,
    interest: formData?.interest,
    startLocation: formData?.startLocation,
    details: formData?.details, 
    itinerary: formData?.itinerary, 
    ratingAverage: formData?.ratingAverage, 
    numOfRating: formData?.numOfRating,
    isActive: formData?.isActive, 
    hotels: formData?.hotels, 
    locations: formData?.locations, 
    transports: formData?.transports,
    code: formData?.code,
    title: formData?.title,
    summary: formData?.summary,
    // interest: formData?.interest,
    // type: formData?.typeValue?.value,
    description: formData?.description,
    category: formData?.categoryValue?.value,
    currency: formData?.currencyValue?.value,
    regularPrice: Number(formData?.regularPrice ?? 1),
    discountPrice: Number(formData?.discountPrice ?? 1),
    discountPercentage: Number(formData?.discountPercentage ?? 1),
    duration: Number(formData?.duration ?? 1),
    priceOptions,
    inclusions: formData?.inclusions,
    exclusions: formData?.exclusions,
    thumbnail: formData?.thumbnail,
    images: getValidArray(formData?.images),
  }
}
