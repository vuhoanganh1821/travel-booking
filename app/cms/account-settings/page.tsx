import CMSLayout from 'components/Layout/CMSLayout'
import AccountSettings from 'pages/CMS/AccountSettings'

const AccountSettingsPage = () => {
  return (
    <CMSLayout title="Account Settings" topBarTitle="Account Settings">
      <AccountSettings />
    </CMSLayout>
  );
}

export default AccountSettingsPage
