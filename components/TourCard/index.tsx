import { Box, Img, Text, VStack } from '@chakra-ui/react'
import { ITour } from 'interfaces/tour'
import { border } from 'themes/globalStyles'
import { useRouter } from 'next/navigation'
import routes from 'routes'

interface ITourCardProps {
  tour: ITour
}

const TourCard = (props: ITourCardProps) => {
  const { tour } = props
  const router = useRouter()

  function gotoTourDetailPage(): void {
    router.push(routes.detail.value(tour?._id))
  }

  return (
    <Box border={border} borderRadius={8} boxShadow="md" cursor="pointer" onClick={gotoTourDetailPage}>
      <Img width="full" height="200px" src={tour?.thumbnail} objectFit="cover" borderTopRadius={8} />
      <VStack align="flex-start" padding={4}>
        <Text color="gray.800" fontWeight={500} lineHeight={6}>
          {tour?.title}
        </Text>
        <Text fontSize="sm">{`${tour?.regularPrice} ${tour?.currency}`}</Text>
      </VStack>
    </Box>
  )
}

export default TourCard
