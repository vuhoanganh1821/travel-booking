'use client'
import { useEffect } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import TourCard from 'components/TourCard'
import MainLayout from 'components/Layout/MainLayout'
import { useStores } from 'hooks/useStores'
import { observer } from 'mobx-react'

const HomePage = () => {
  const { tourStore } = useStores()
  const { tours } = tourStore

  useEffect(() => {
    tourStore.fetchActiveTours()
  }, [])

  return (
    <MainLayout>
      <SimpleGrid maxWidth="1200px" columns={{ base: 1, sm: 2, md: 4 }} gap={6} padding={8}>
        {tours.map((tour) => (
          <TourCard key={tour._id} tour={tour} />
        ))}
      </SimpleGrid>
    </MainLayout>
  )
}

export default observer(HomePage)
