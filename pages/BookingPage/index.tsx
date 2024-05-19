"use client";
import { HStack, VStack} from "@chakra-ui/react";
import { observer } from "mobx-react";
import PageLayout from "components/Layout/WebLayout/PageLayout";
import { useStores } from "hooks";
import Title from "components/Title";
import BookingItem from "./BookingItem";
import { useEffect } from "react";

const BookingPage = () => {
  const {bookingStore} = useStores()
  const {bookingList} = bookingStore

  useEffect(() => {
    bookingStore.fetchListBooking()
  }, [])

  return (
    <PageLayout>
      <VStack 
        minHeight="700px"
        height="full"
        maxWidth="1300px"
        width="full"
        padding="24px"
        align='flex-start'
      >
        <Title text='Your booking'/>
        <HStack width='full' justify='space-between' marginTop='20px' spacing={10} align='flex-start'> 
          <VStack width='full' flex={2} align='flex-start' spacing={8}>
            {bookingList.length > 0 && (bookingList.map((booking) => <BookingItem key={booking._id} booking={booking}/>))}
          </VStack>
        </HStack> 
      </VStack>
    </PageLayout>
  );
}

export default observer(BookingPage);
