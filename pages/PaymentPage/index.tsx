"use client";
import { 
  VStack,  
  Flex, 
  Box, 
  Text, 
  Image, 
  Button, 
  HStack,
  Divider} from "@chakra-ui/react";
import BookingStatus from "components/BookingStatus";
import PageLayout from "components/Layout/WebLayout/PageLayout";
import { useRouter } from "next/navigation";
import Title from "components/Title";
import { useEffect, useState } from "react";
import { useStores } from "hooks";
import { formatCurrency } from "utils/common";
import { observer } from "mobx-react";
import BillingInfo from "./BillingInfo";


const PaymentPage = () => {
  const route = useRouter()
  const {bookingStore, checkoutStore} = useStores();
  const {bookingDetail, bookingId} = bookingStore
  const {paymentURL} = checkoutStore
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handlePaymentMethodClick = (paymentMethod: string) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  useEffect(() => {
    bookingStore.fetchBookingDetail(bookingId);
  }, [bookingId]);

  useEffect(() => {
    if(paymentURL){
      route.push(paymentURL)
    }
  }, [paymentURL])

  async function handlePayment() {
    await checkoutStore.prePayCheckout(bookingId)
  }
  return (
    <PageLayout>
      <VStack
      minHeight="700px"
      height="full"
      maxWidth="1300px"
      width="full"
      padding="24px">
        <BookingStatus currentPage="payment"/>
        <VStack
          direction="column"
          width="500px"
          height="full"
          backgroundColor="#fff"
          align='flex-start'
          borderRadius='15px'
          boxShadow='lg'
          padding='20px 14px'
        >
          <Title text='How would you like to pay?'/>

          <Flex mt={10} justify="space-between" width="full" marginY='20px'>
            <Box
              width={100}
              alignItems='center'
              border='2px solid transparent'
              onClick={() => handlePaymentMethodClick('visa')}
              borderColor={selectedPaymentMethod === 'visa' ? 'teal' : 'transparent'}
              cursor="pointer"
            >
              <Image src="https://1000logos.net/wp-content/uploads/2021/11/VISA-logo.png" alt="Visa" width={100} />
            </Box>

            <Box
              width={100}
              alignItems='center'
              border='2px solid transparent'
              onClick={() => handlePaymentMethodClick('mastercard')}
              borderColor={selectedPaymentMethod === 'mastercard' ? 'teal' : 'transparent'}
              cursor="pointer"
            >
              <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7Wl7obNMoRyoW5ZJirDhZVLf99NQKWw6UZv5zIUOLUuDn6UrCOU6qcqJx2VIrhRIRblg&usqp=CAU" alt="Mastercard" width={100} />
            </Box>

            <Box
              width={100}
              alignItems='center'
              border='2px solid transparent'
              onClick={() => handlePaymentMethodClick('vnpay')}
              borderColor={selectedPaymentMethod === 'vnpay' ? 'teal' : 'transparent'}
              cursor="pointer"
            >
              <Image src="https://vnpay.vn/dat-ve-may-bay/1803/6.png?12" alt="VnPay" width={100} />
            </Box>
            <Box
              width={100}
              alignItems='center'
              border='2px solid transparent'
              onClick={() => handlePaymentMethodClick('momo')}
              borderColor={selectedPaymentMethod === 'momo' ? 'teal' : 'transparent'}
              cursor="pointer"
            >
              <Image src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="Momo" width={100} />
            </Box>
          </Flex>
          <Divider colorScheme='teal.300' size='xl' variant='solid'/>
          {bookingDetail && bookingDetail.personalInfo && (
            <BillingInfo bookingDetail={bookingDetail}/>
          )}
          <Divider/>
          <Button marginY='20px' width='full' colorScheme="teal" onClick={handlePayment}>
            Continue to secure payment
          </Button>
         
        </VStack>
      </VStack>
    </PageLayout>
  );
};

export default observer(PaymentPage);
