import CMSLayout from 'components/Layout/CMSLayout'
import LocationManagement from 'pages/CMS/LocationManagement'

const LocationManagementPage = () => {
  return (
    <CMSLayout title="Location Management" topBarTitle="Location Management">
      <LocationManagement />
    </CMSLayout>
  )
}

export default LocationManagementPage
