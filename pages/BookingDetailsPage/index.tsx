import { HStack, VStack, Text, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react"
import PageLayout from "components/Layout/WebLayout/PageLayout"
import Title from "components/Title"

const BookingDetailsPage = () => {
    return(
        <PageLayout>
            <VStack
                minHeight="700px"
                height="full"
                maxWidth="1300px"
                width="full"
                padding="24px"
            >
                <Title alignSelf='flex-start' text='Your booking invoice'/>
                <VStack width='60%' align='flex-start'>
                    <Text fontSize='xl' fontWeight='bold'>Personal infomation</Text>
                    <HStack width='full' justify='space-between'>
                        <VStack align='flex-start'>
                            <Text>Tran Dinh Duy</Text>
                            <Text>Ho Chi Minh</Text>
                            <Text>dinhduytran123@gmail.com</Text>
                        </VStack>
                        <VStack align='flex-start'>
                            <Text>Date: 2024-5-11</Text>
                            <Text>Invoice Id: 123456</Text>
                            <Text>Payment method: Vnpay</Text>
                        </VStack>
                    </HStack>
                    <Text fontSize='xl' fontWeight='bold'>Booking details</Text>
                    <TableContainer width='full'>
                    <Table variant='striped' colorScheme='teal'>
                    <Thead>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>inches</Td>
                                <Td>millimetres (mm)</Td>
                                <Td isNumeric>25.4</Td>
                            </Tr>
                            <Tr>
                                <Td>feet</Td>
                                <Td>centimetres (cm)</Td>
                                <Td isNumeric>30.48</Td>
                            </Tr>
                            <Tr>
                                <Td>yards</Td>
                                <Td>metres (m)</Td>
                                <Td isNumeric>0.91444</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
                </VStack>

               
            </VStack>
        </PageLayout>
    )
}

export default BookingDetailsPage