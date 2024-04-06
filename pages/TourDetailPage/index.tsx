'use client'
import { useEffect } from 'react'
import { Button, Heading, HStack, Img, Text, VStack } from '@chakra-ui/react'
import Icon from 'components/Icon'
import MainLayout from 'components/Layout/MainLayout'
import { useStores } from 'hooks/useStores'
import { observer } from 'mobx-react'
import { usePathname } from 'next/navigation'

const TourDetailPage = () => {
  const { tourStore } = useStores()
  const { tourDetail } = tourStore
  const pathname = usePathname()
  const tourId = pathname?.split('/').pop()

  useEffect(() => {
    if (tourId) {
      tourStore.fetchTourDetail(tourId)
    }
  }, [tourId])

  return (
    <MainLayout>
      <VStack maxWidth="1300px" width="full" align="flex-start" spacing={4} padding={8}>
        <Heading color="gray.800" fontWeight={700} lineHeight={10}>
          {tourDetail?.title}
        </Heading>
        <HStack spacing={4}>
          <HStack marginBottom={1} hidden={tourDetail?.numOfRating === 0}>
            {Array.from({ length: Math.round(tourDetail?.numOfRating ?? 5) }).map((_, index) => (
              <Icon key={index} iconName="yellow-star.svg" size={20} />
            ))}
          </HStack>
          <Text>
            {`${tourDetail?.numOfRating} / 5`}
          </Text>
          <Text fontSize="sm" textDecoration="underline">3456 reviews</Text>
        </HStack>
        <Img width="full" height="500px" src={tourDetail?.thumbnail} borderRadius={8} />
        <HStack width="full" justify="space-between">
          <VStack>
            <Text fontSize="sm">Price</Text>
            <Text fontSize="sm">Duration</Text>
            <Text fontSize="sm">Languages</Text>
          </VStack>
          <VStack width="30%" align="flex-start" padding={4} border="1px solid #DCDFE4" borderRadius={8} spacing={0}>
            <Text>From</Text>
            <HStack width="full" justify="space-between">
              <Text fontSize="2xl" fontWeight={700}>$1000</Text>
              <Button colorScheme="teal" borderRadius="80px">
                Check availability
              </Button>
            </HStack>
            <Text>per person</Text>
            <HStack marginTop="24px !important" spacing={6}>
              <Icon iconName="card.svg" size={40} />
              <Text fontSize="sm">Reserve now & pay later to book your spot and pay nothing today</Text>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </MainLayout>
  )
}

export default observer(TourDetailPage)
