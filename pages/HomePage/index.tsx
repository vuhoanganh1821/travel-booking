'use client'
import { SimpleGrid } from '@chakra-ui/react'
import TourCard from 'components/TourCard'
import MainLayout from 'components/Layout/MainLayout'

const HomePage = () => {
  return (
    <MainLayout>
      <SimpleGrid maxWidth="1200px" columns={{ base: 1, sm: 2, md: 4 }} gap={6} padding={8}>
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
      </SimpleGrid>
    </MainLayout>
  )
}

export default HomePage
