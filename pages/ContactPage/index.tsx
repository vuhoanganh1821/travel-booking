"use client";
import { 
  HStack, 
  VStack, 
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Text
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import routes from "routes";
import BookingStatus from "../../components/BookingStatus";
import PageLayout from "components/Layout/WebLayout/PageLayout";
import { useStores } from "hooks";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Title from "components/Title";
import OrderItem from "./OrderItem";
import { useEffect, useState } from "react";
import { IRequestTour, IRequsetCheckoutReview } from "interfaces/checkout";
import { ICreateBookingForm, ITourBookingInfo } from "interfaces/booking";
import { formatCurrency } from "utils/common";



const ContactPage = () => {
  const {checkoutStore, bookingStore} = useStores();
  const route = useRouter();
  const {checkout, order, orderSummary, itemPrice } = checkoutStore;
  const {listBooking} = bookingStore
  const [dataCheckoutReview, setDataCheckoutReview] = useState<IRequsetCheckoutReview>({} as IRequsetCheckoutReview);

  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    setDataCheckoutReview(orderSummary)
  }, [orderSummary])

  useEffect(() => {
      if(dataCheckoutReview?.cart) {
        checkoutStore.fetchCheckoutReview(dataCheckoutReview);
      }
  }, [dataCheckoutReview])

  useEffect(() => {
    if(listBooking) {
      bookingStore.setBookingId(listBooking._id)
      route.push(routes.booking.payment)
    }
  }, [listBooking])

  async function onSubmit(value: any) {
    try{
      const cartId = dataCheckoutReview.cart ?? ''
      const bookingItem: ITourBookingInfo[] = []
      const personalInfo = value
      dataCheckoutReview.tours?.map((tour) => bookingItem.push({tour: tour.tour, startDate: tour.startDate}))
      let data: ICreateBookingForm = {
        cart: cartId, 
        tours: bookingItem, 
        personalInfo: personalInfo,
      }
      data = orderSummary.discountCode ? {...data, discountCode: orderSummary.discountCode} : data
      await bookingStore.createBooking(data)
      toast.success('Create booking sucessfully')
    }catch{
      toast.error('Create booking failed')  
    }
  }

  return (
    <PageLayout>
      <VStack  
          minHeight="700px"
          height="full"
          maxWidth="1300px"
          width="full"
          padding="24px"
      >
        <BookingStatus currentPage="contact"/>
        <HStack width='full' align='flex-start' spacing={20}>
          <Box flex={1}>
            <Title text="Personal detail"/>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor='name'>Full name</FormLabel>
                <Input
                  id='fullname'
                  placeholder='Full name'
                  {...register('name', {
                    required: 'This is required',
                    minLength: { value: 4, message: 'Minimum length should be 4' },
                  })}
                />
                <FormLabel htmlFor='phone'>Phone number</FormLabel>
                <Input
                  id='phone'
                  placeholder='Phone number'
                  {...register('phone', {
                    required: 'This is required',
                    minLength: { value: 10, message: 'Minimum length should be 10' },
                  })}
                />
                <FormErrorMessage>
                {errors.name && typeof errors.name.message === 'string' && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                Go to payment
              </Button>
            </form>
          </Box>
          <VStack flex={1} align='flex-start'>
            <Title text='Order summary'/>
            <Box width="full" height='fit-content' border="2px solid #ccc" borderRadius="4px"> 
              {checkout &&
                checkout.map((tour) => (
                  <OrderItem key={tour._id} tour={tour}/>
                ))}
                <HStack fontSize="xl" fontWeight='600' padding="0px 28px 8px 28px" height='66px' bg='#EBEEF1' justifyContent='space-between'>
                <Text>Subtotal</Text>
                <VStack align='flex-end'>
                    <Text fontSize="2xl" color="#396973">
                      {itemPrice && itemPrice.length !== 0
                        ? order.totalOrder && formatCurrency(order.totalOrder - order.discount): 
                          order.totalOrder &&formatCurrency(order.totalOrder)}
                    </Text>
                    <Text
                      fontSize="sm"
                      textDecoration="line-through"
                      opacity="0.5"
                    >
                      {itemPrice && itemPrice.length !== 0
                        ? order.totalOrder && formatCurrency(order.totalOrder)
                        : ""}
                    </Text>
                  </VStack>
              </HStack>
            </Box>
          </VStack>
        </HStack>
      </VStack>
    </PageLayout>
  );
};

export default ContactPage;
