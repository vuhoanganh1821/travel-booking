import { HStack, VStack, Text } from "@chakra-ui/react"
import Title from "components/Title"
import { IBookingDetail, IBookingInfoBody } from "interfaces/booking"
import { formatCurrency } from "utils/common"

interface IBillingInfo {
    bookingDetail: IBookingDetail
}

const BillingInfo = (props: IBillingInfo) => {
    const{bookingDetail} = props
    return(
        <VStack marginY='20px' fontSize='md' fontWeight='bold' width='full' align='flex-start' spacing={19}>
            <Title text='Your billing details'/>
            <HStack fontSize='md' fontWeight='bold' width='full' justify='space-between'>
                <Text>Name: </Text>
                <Text>{bookingDetail.personalInfo.name}</Text>
            </HStack>
            <HStack fontSize='md' fontWeight='bold' width='full' justify='space-between'>
                <Text>Phone Number: </Text>
                <Text>{bookingDetail.personalInfo.phone}</Text>
            </HStack>
                {bookingDetail.checkoutOrder && bookingDetail.checkoutOrder.totalOrder && (
                <HStack fontSize='xl' fontWeight='bold' width='full' justify='space-between'>
                    <Text>Total Order: </Text>
                    <Text>{formatCurrency(bookingDetail.checkoutOrder.totalPrice)}</Text>
            </HStack>
            )}
        </VStack>
    )
}

export default BillingInfo