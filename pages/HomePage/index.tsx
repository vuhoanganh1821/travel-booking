"use client";
import { useEffect } from "react";
import { SimpleGrid, Box } from "@chakra-ui/react";
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";
import TourCard from "components/TourCard";
import HomeLayout from "components/Layout/WebLayout/HomeLayout";
import { useStores } from "hooks";
import { observer } from "mobx-react";
import Title from "components/Title";
import { PLATFORM } from "enums/common";

const HomePage = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const route = useRouter();
  const { tourStore, authStore } = useStores();
  const { tours } = tourStore;

  useEffect(() => {
   
    const userId = searchParams?.get('userId')
    const accessToken = searchParams?.get('accessToken')
    const platform = PLATFORM.WEBSITE

    if (userId && accessToken) {
      localStorage.setItem(`${platform}UserId`, userId);
      localStorage.setItem(`${platform}Token`, accessToken);
    }
    if(userId){
      authStore.getUserbyId(PLATFORM.WEBSITE)
      route.push('/')
    }
  }, [pathname, searchParams]);


  useEffect(() => {
    tourStore.fetchActiveTours();
  }, []);

  console.log('HomePage', tours);

  return (
    <HomeLayout>
      <Box
        margin="0px 253px"
        padding="0px 98px"
        alignSelf="flex-start"
        mt="32px"
      >
        <Title  
          fontSize="3xl"
          fontWeight="600" 
          text='Unforgettable tours experiences'/>
      </Box>
      <SimpleGrid
        maxWidth="1200px"
        columns={{ base: 1, sm: 2, md: 4 }}
        gap={8}
        padding={1}
        mt="8px"
      >
        {tours?.map((tour) => (
          <TourCard key={tour?._id} tour={tour} />
        ))}
      </SimpleGrid>
    </HomeLayout>
  )
}

export default observer(HomePage)
