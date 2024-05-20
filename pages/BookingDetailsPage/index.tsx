"use client";
import { HStack, VStack, Text, Image, Divider, Box, Button } from "@chakra-ui/react"
import PageLayout from "components/Layout/WebLayout/PageLayout"
import Title from "components/Title"
import dayjs from "dayjs"
import { useStores } from "hooks"
import routes from "routes";
import { observer } from "mobx-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { formatCurrency } from "utils/common";
import RatingModal from "./RatingModal";
import InvoiceItem from "./InvoiceItem";
import { ITour } from "interfaces/tour";


const BookingDetailsPage = () => {
    const {bookingStore} = useStores()
    const {bookingDetail} = bookingStore
    const route = useRouter();
    const [isOpenRatingModal, setIsOpenRatingModal] = useState<boolean>(false)
    const [tour, setTour] = useState<ITour>()

    function handleOpenRatingModal(tour: ITour) {
        setTour(tour)
        setIsOpenRatingModal(true)
    }

    function handleGoToPayment() {
        if(bookingDetail?._id){
            bookingStore.setBookingId(bookingDetail?._id)
            route.push(routes.booking.payment)
        }
    }

    useEffect(() => {
        const currentUrl = window.location.href;
        const urlParts = currentUrl.split("/");
        const bookingId = urlParts[urlParts.length - 1];
        bookingStore.fetchBookingDetail(bookingId)
    }, [])

    return (
        <PageLayout>
            <VStack
                minHeight="700px"
                height="full"
                maxWidth="1300px"
                width="full"
                padding="24px"
                spacing={8}
            >
                <Title alignSelf='flex-start' text='Your Booking Invoice' />
                <VStack width='100%' align='flex-start' spacing={6}>
                    <Box width='100%'>
                        <Text fontSize='2xl' fontWeight='bold' mb={2}>Personal Information</Text>
                        <HStack fontSize='lg' fontWeight={500} width='full' justify='space-between' spacing={12}>
                            <VStack align='flex-start' spacing={1}>
                                <Text>{bookingDetail?.personalInfo.name}</Text>
                                <Text>{bookingDetail?.personalInfo.phone}</Text>
                            </VStack>
                            <VStack align='flex-start' spacing={1}>
                                <Text>Date: {dayjs(bookingDetail?.bookingItems[0].startDate).format('YYYY-MM-DD')}</Text>
                                <Text>Invoice ID: {bookingDetail?.payment?.transactionNo}</Text>
                                <Text>Payment Method: {bookingDetail?.payment?.method}</Text>
                            </VStack>
                        </HStack>
                    </Box>
                    <Divider />
                    <Text fontSize='2xl' fontWeight='bold' mb={2}>Booking Details</Text>
                    {bookingDetail?.bookingItems && bookingDetail?.bookingItems.map((bookingItem, index) => 
                        <InvoiceItem key={bookingItem._id} numOfItem={index} bookingItems={bookingItem} openRatingModal={handleOpenRatingModal}/>)}
                   
                    <Divider />
                    <HStack width='full' justify='space-between' align='flex-start' paddingRight={6}>
                        <Image width={250} src='https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg' alt='qrcode' />
                        <VStack align='flex-start' spacing={5}>
                            <HStack width='full' justify='space-between' spacing={4}>
                                <Text fontSize='lg' fontWeight='bold'>Subtotal: </Text>
                                <Text fontSize='lg' fontWeight={500}>{formatCurrency(bookingDetail?.checkoutOrder.totalOrder ?? 0)}</Text>
                            </HStack>
                            <Divider/>
                            <HStack width='full' justify='space-between' spacing={4}>
                                <Text fontSize='lg' fontWeight='bold'>Discount: </Text>
                                <Text fontSize='lg' fontWeight={500}>{formatCurrency(bookingDetail?.checkoutOrder.discount ?? 0)}</Text>
                            </HStack>
                            <Divider/>
                            <HStack width='full' justify='space-between' spacing={4}>
                                <Text fontSize='lg' fontWeight='bold'>Total price: </Text>
                                <Text fontSize='lg' fontWeight={500}>{formatCurrency(bookingDetail?.checkoutOrder.totalPrice ?? 0)}</Text> 
                            </HStack>
                            {bookingDetail?.status === 'pending' ? 
                                <Button width='full' colorScheme="teal" onClick={handleGoToPayment}>Go to payment</Button>
                                : <Text 
                                    textAlign='center' 
                                    paddingY={5} 
                                    borderRadius={10}
                                    fontSize='lg'
                                    fontWeight={500} 
                                    width='full' 
                                    bg='#4dbb4d' 
                                    color='#fff' >
                                        Your booking has been Paid
                                    </Text>
                            }
                        </VStack>
                    </HStack>
                </VStack>
                <RatingModal tour={tour} isOpen={isOpenRatingModal} onClose={() => setIsOpenRatingModal(false)}/> 
            </VStack>
        </PageLayout>
    )
}

export default observer(BookingDetailsPage)
