'use client'
import { useEffect } from 'react'
import { SimpleGrid, Text } from '@chakra-ui/react'
import TourCard from 'components/TourCard'
import HomeLayout from 'components/Layout/WebLayout/HomeLayout'
import { useStores } from 'hooks'
import { observer } from 'mobx-react'

const HomePage = () => {
  const { tourStore } = useStores()
  const { tours } = tourStore

  useEffect(() => {
    tourStore.fetchActiveTours()
  }, [])

  return (
    <HomeLayout>
      <Text
        margin="0px 253px"
        padding="0px 98px"
        fontSize="3xl"
        fontWeight="600"
        alignSelf="flex-start"
        mt="32px"
      >
        Unforgettable tours experiences
      </Text>
      <SimpleGrid
        maxWidth="1200px"
        columns={{ base: 1, sm: 2, md: 4 }}
        gap={8}
        padding={1}
        mt="8px"
      >
        {tours.map((tour) => (
          <TourCard key={tour?._id} tour={tour} />
        ))}
      </SimpleGrid>
    </HomeLayout>
  )
}

export default observer(HomePage)
