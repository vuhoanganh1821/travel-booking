import { Box, HStack, Stack, Text, Button, IconButton } from "@chakra-ui/react";
import capitalize from 'lodash/capitalize'
import { useRouter } from "next/navigation";
import routes from "routes";
import { IBookingInfoBody } from "interfaces/booking";
import { FaTrash } from "react-icons/fa";
import { useStores } from "hooks";
import { formatCurrency } from "utils/common";
import { useState } from "react";

interface IBookingItem {
    booking: IBookingInfoBody
}

const BookingItem = (props: IBookingItem) => {
    const {booking} = props
    const route = useRouter();
    const {bookingStore} = useStores();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    function handleGoToPayment() {
        bookingStore.setBookingId(booking._id)
        route.push(routes.booking.payment)
    }

    function handleViewBookingDetail() {
        route.push(routes.booking.detail(booking._id))
    }

    async function handleDeleteBooking() {
        try{
            setIsLoading(true)
            await bookingStore.deleteBooking(booking._id)
            route.refresh()
            setIsLoading(false)
        } catch {
            setIsLoading(false)
        }

    }

    return (
        <HStack
            width="full"
            bg="#fff"
            boxShadow="lg"
            borderRadius="4px"
            p={4}
            justify="space-between"
        >
            <Stack flex={2} spacing={2} fontSize="md">
                <Text fontWeight="bold">{booking.personalInfo.name}</Text>
                <Text fontSize="sm">{booking.personalInfo.phone}</Text>
                <Text  
                    color='teal'
                    fontWeight='bold'
                    textUnderlineOffset={2}
                    userSelect="none"
                    onClick={handleViewBookingDetail}
                    _hover={{
                        textDecoration: "underline",
                        color: "##026b6b",
                        transition: "color 0.2s ease-in-out, text-decoration 0.2s ease-in-out"
                }}>
                    {`View details ->`}        
                </Text>
            </Stack>
            <Box
                bg={booking.status == 'pending' ? "#f15c36": "#4fd14a"}
                color="#fff"
                px={4}
                py={2}
                borderRadius="full"
                border={booking.status == 'pending' ? "3px solid #740a03": "3px solid #0e961e"}
                fontSize="md"
               
            >
                <Text fontWeight="bold">{capitalize(booking.status)}</Text>
            </Box>
            <Stack flex={1} spacing={1} alignItems="flex-end">
                <HStack fontSize='lg'>
                    <Text fontWeight="bold" color="gray.600">Total:</Text>
                    <Text fontWeight="bold">{formatCurrency(booking.checkoutOrder.totalPrice)}</Text>
                </HStack>
                <HStack spacing={5}>
                    {booking.status == 'pending' ? (
                    <>
                        <Button colorScheme="teal" size="md" onClick={handleGoToPayment}>Pay Now</Button>
                        <IconButton
                        colorScheme="red"
                        size="md"
                        aria-label="Delete"
                        onClick={handleDeleteBooking}
                        icon={<FaTrash />}/>
                    </>
                    ): <Text >{`Payment code: `}<Text fontWeight="bold">{booking.payment?.bankTranNo}</Text> </Text>}
                </HStack>
            </Stack>
        </HStack>
    );
};

export default BookingItem;
