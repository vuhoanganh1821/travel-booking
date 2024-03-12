import CMSLayout from 'components/Layout/CMSLayout'
import BookingManagement from 'pages/CMS/BookingManagement'

const BookingManagementPage = () => {
  return (
    <CMSLayout title="Booking Management" topBarTitle="Booking Management">
      <BookingManagement />
    </CMSLayout>
  );
}

export default BookingManagementPage
