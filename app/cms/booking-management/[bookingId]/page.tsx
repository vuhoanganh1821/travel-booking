import CMSLayout from 'components/Layout/CMSLayout'
import BookingDetail from 'pages/CMS/BookingManagement/BookingDetail'

const BookingDetailPage = () => {
  return (
    <CMSLayout title="Booking Management" topBarTitle="Booking Management">
      <BookingDetail />
    </CMSLayout>
  );
}

export default BookingDetailPage
