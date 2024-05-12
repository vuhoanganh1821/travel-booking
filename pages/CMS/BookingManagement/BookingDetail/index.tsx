'use client'
import { useEffect } from 'react'
import { Box, Button, HStack, SimpleGrid, Tag, TagLabel, Text, VStack } from '@chakra-ui/react'
import FormLabel from 'components/FormLabel'
import dayjs from 'dayjs'
import { useStores } from 'hooks/useStores'
import capitalize from 'lodash/capitalize'
import get from 'lodash/get'
import { observer } from 'mobx-react'
import { usePathname, useRouter } from 'next/navigation'
import routes from 'routes'
import { getStatusColor } from '../utils'

const BookingDetail = () => {
  const { bookingStore } = useStores()
  const { bookingDetail } = bookingStore
  const router = useRouter()
  const pathname = usePathname()
  const bookingId = pathname?.split('/').pop() ?? ''
  const statusColor = getStatusColor(bookingDetail?.status ?? '')

  function backToBookingList() {
    router.push(routes.cms.bookingManagement.value)
  }

  useEffect(() => {
    if (bookingId) {
      bookingStore.fetchBookingDetail(bookingId)
    }
  }, [bookingId])

  return (
    <Box paddingX={{ base: 6, lg: 8 }} paddingY={6}>
      <HStack width="full" justify="space-between" marginBottom={6}>
        <HStack spacing={6}>
          <Text fontSize="lg" fontWeight={600}>
            Booking Detail
          </Text>
          <Tag size="lg" variant="outline" colorScheme={statusColor} backgroundColor={`${statusColor}.50`}>
            <TagLabel>{capitalize(bookingDetail?.status)}</TagLabel>
          </Tag>
        </HStack>
        <HStack spacing={4}>
          <Button background="white" borderWidth={1} borderColor="gray.300" onClick={backToBookingList}>
            Back to Booking List
          </Button>
        </HStack>
      </HStack>
      <HStack width="full" align="flex-start" spacing={8}>
        <VStack width="full" align="flex-start" spacing={6}>
          <Box width="full" background="white" padding={8} borderRadius={8} borderWidth={1} boxShadow="sm">
            {get(bookingDetail, 'bookingItems', []).map((item, index) => (
              <SimpleGrid key={index} maxWidth="1200px" columns={{ base: 1, md: 4 }} gap={4}>
                <FormLabel label="Tour Code" value={get(item, 'tour.code', '')} />
                <FormLabel label="Tour Title" value={get(item, 'tour.title', '')} />
                <FormLabel label="Rating Average" value={get(item, 'tour.ratingAverage', '')} />
                <FormLabel label="Number Of Rating" value={get(item, 'tour.numOfRating', '')} />
                <FormLabel label="Ticket Code" value={get(item, 'ticketCode', '')} />
                <FormLabel label="Start Time" value={get(item, 'startTime', '')} />
                <FormLabel label="Start Date" value={dayjs(get(item, 'startDate')).format('DD/MM/YYYY')} />
                <FormLabel label="Participants">
                  <VStack align="flex-start" gridColumn="span 3">
                    {get(item, 'participants', []).map((participant, index) => (
                      <HStack key={index} width="full">
                        <Text width="180px" color="gray.800" fontWeight={500} lineHeight={6}>
                          {`${get(participant, 'quantity', 0)} ${get(participant, 'title', '')}`}
                        </Text>
                        <Text color="gray.800" fontWeight={500} lineHeight={6}>
                          {`${get(participant, 'price', '')} ${get(participant, 'currency', '')}`}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </FormLabel>
              </SimpleGrid>
            
            ))}
          </Box>
          <Text fontSize="lg" fontWeight={600}>
            Checkout Order
          </Text>
          <Box width="full" background="white" padding={8} borderRadius={8} borderWidth={1} boxShadow="sm">
            <SimpleGrid maxWidth="1200px" columns={{ base: 1, md: 4 }} gap={4}>
              <FormLabel label="Discount" value={get(bookingDetail, 'checkoutOrder.discount', '')} />
              <FormLabel label="Total Order" value={get(bookingDetail, 'checkoutOrder.totalOrder', '')} />
              <FormLabel label="Total Price" value={get(bookingDetail, 'checkoutOrder.totalPrice', '')} />
            </SimpleGrid>
          </Box>
          <Text fontSize="lg" fontWeight={600}>
            Payment
          </Text>
          <Box width="full" background="white" padding={8} borderRadius={8} borderWidth={1} boxShadow="sm">
            <SimpleGrid maxWidth="1200px" columns={{ base: 1, md: 4 }} gap={4}>
              <FormLabel label="Amount" value={get(bookingDetail, 'payment.amount', '')} />
              <FormLabel label="Bank Code" value={get(bookingDetail, 'payment.bankCode', '')} />
              <FormLabel label="Bank Tran No" value={get(bookingDetail, 'payment.bankTranNo', '')} />
              <FormLabel label="Method" value={get(bookingDetail, 'payment.method', '')} />
              <FormLabel label="Transaction No" value={get(bookingDetail, 'payment.transactionNo', '')} />
            </SimpleGrid>
          </Box>
        </VStack>
        <VStack
          maxWidth={400}
          width="full"
          align="flex-start"
          background="white"
          padding={8}
          borderRadius={8}
          borderWidth={1}
          boxShadow="sm"
          spacing={6}
        >
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            <FormLabel label="Phone Number" value={get(bookingDetail, 'personalInfo.phone', '')} gridColumn="" />
            <FormLabel label="Full Name" value={get(bookingDetail, 'personalInfo.name', '')} gridColumn="" />
            <FormLabel label="Email" value={get(bookingDetail, 'personalInfo.email', '')} gridColumn="" />
            <FormLabel label="Apply Date" value={dayjs(bookingDetail?.createdAt).format('DD/MM/YYYY')} gridColumn="" />
          </SimpleGrid>
        </VStack>
      </HStack>
    </Box>
  )
}

export default observer(BookingDetail)
