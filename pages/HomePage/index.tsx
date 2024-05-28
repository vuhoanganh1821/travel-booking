"use client";
import { useEffect } from "react";
import { SimpleGrid, Box, Button } from "@chakra-ui/react";
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";
import routes from "routes";
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

  function handleGoToAllActivities() {
    route.push(routes.allActivities.value)
  }

  return (
    <HomeLayout>
      <Box
        width='full'
        display='flex'
        justifyContent="center"
        alignItems="center"
        mt="32px"
      >
        <Title 
          maxWidth="1300px"
          width='full' 
          fontSize="3xl"
          fontWeight="600" 
          text='Unforgettable tours experiences'/>
      </Box>
      <SimpleGrid
        maxWidth="1300px"
        columns={{ base: 1, sm: 2, md: 4 }}
        gap={8}
        padding={1}
        mt="8px"
      >
        {tours?.map((tour) => (
          <TourCard key={tour?._id} tour={tour} />
        ))}
        
      </SimpleGrid>
      <Box 
        marginY={4}
        _before={{
          position: "absolute",
          content: "''",
          maxWidth: "600px",
          minWidth: "100px",
          marginLeft: "-600px",
          marginTop: "18px",
          width: "full",
          height: "2px",
          bg: `teal`,
          zIndex: -1,
        }}
        _after={{
          position: "absolute",
          content: "''",
          maxWidth: "600px",
          minWidth: "100px",
          marginTop: "18px",
          marginright: '-120px',
          width: "full",
          height: "2px",
          bg: `teal`,
          zIndex: -1,
        }}>
        <Button 
          color='teal' 
          border='2px solid teal' 
          borderRadius='full' 
          bg='transparent' 
          onClick={handleGoToAllActivities}
        >
          Show more
        </Button>
         
      </Box>
    </HomeLayout>
  )
}

export default observer(HomePage)
