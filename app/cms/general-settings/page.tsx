import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import CMSLayout from 'components/Layout/CMSLayout'
import CategoryManagement from 'pages/CMS/CategoryManagement'
import DiscountManagement from 'pages/CMS/DiscountManagement'
import HotelManagement from 'pages/CMS/HotelManagement'
import LocationManagement from 'pages/CMS/LocationManagement'
import TransportationManagement from 'pages/CMS/TransportationManagement'

const GeneralSettingsPage = () => {
  return (
    <CMSLayout title="General Settings" topBarTitle="General Settings">
      <Tabs colorScheme="teal">
        <TabList height="50px" background="gray.50" paddingX={8}>
          <Tab fontWeight={500}>Discount</Tab>
          <Tab fontWeight={500}>Location</Tab>
          <Tab fontWeight={500}>Transportation</Tab>
          <Tab fontWeight={500}>Category</Tab>
          <Tab fontWeight={500}>Hotel</Tab>
        </TabList>
        <TabPanels>
          <TabPanel padding={0}>
            <DiscountManagement />
          </TabPanel>
          <TabPanel padding={0}>
            <LocationManagement />
          </TabPanel>
          <TabPanel padding={0}>
            <TransportationManagement />
          </TabPanel>
          <TabPanel padding={0}>
            <CategoryManagement />
          </TabPanel>
          <TabPanel padding={0}>
            <HotelManagement />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </CMSLayout>
  )
}

export default GeneralSettingsPage
