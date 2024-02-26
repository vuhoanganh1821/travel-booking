import { Box, Img, Text, VStack } from '@chakra-ui/react'
import { border } from 'themes/globalStyles'
import { useRouter } from 'next/navigation'
import routes from 'routes'

const TourCard = () => {
  const router = useRouter()
  const src = 'https://cdn.getyourguide.com/img/tour/bc741f5d1499ff7e.jpeg/132.jpg'

  function gotoTourDetailPage(): void {
    router.push(routes.detail.value(10))
  }

  return (
    <Box border={border} borderRadius={8} boxShadow="md" cursor="pointer" onClick={gotoTourDetailPage}>
      <Img width="full" height="200px" src={src} objectFit="cover" borderTopRadius={8} />
      <VStack align="flex-start" padding={4}>
        <Text color="gray.800" fontWeight={500} lineHeight={6}>
          Berlin: 1-Hour City Tour by Boat with Guaranteed Seating
        </Text>
        <Text fontSize="sm">$1000 / đêm</Text>
      </VStack>
    </Box>
  )
}

export default TourCard
