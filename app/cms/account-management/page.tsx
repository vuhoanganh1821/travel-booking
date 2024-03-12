import CMSLayout from 'components/Layout/CMSLayout'
import AccountManagement from 'pages/CMS/AccountManagement'

const AccountManagementPage = () => {
  return (
    <CMSLayout title="Account Management" topBarTitle="Account Management">
      <AccountManagement />
    </CMSLayout>
  );
}

export default AccountManagementPage
