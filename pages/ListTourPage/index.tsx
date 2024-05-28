"use client";
import { SimpleGrid, VStack, Text, Box } from "@chakra-ui/react"
import ListTourLayout from "components/Layout/WebLayout/ListTourLayout"
import Title from "components/Title"
import TourCard from "components/TourCard";
import { useStores } from "hooks";  
import { observer } from "mobx-react";
import Maps from "pages/TourDetailPage/Maps";
import { useEffect, useState } from "react";

const ListTourPage = () => {

    const { tourStore, locationStore } = useStores();
    const { tours } = tourStore;
    const { locationDetail } = locationStore;
    const [locId, setLocId] = useState<string>()

    useEffect(() => {
        const currentUrl = window.location.href;
        const urlParts = currentUrl.split("/");
        setLocId(urlParts[urlParts.length - 1])
      }, [])

    useEffect(() => {
        if(locId){
            locationStore.fetchLocationDetail(locId);
        }
    }, [locId])

    useEffect(() => {
        tourStore.fetchActiveTours();
      }, []);

    return(
        <ListTourLayout >
            <VStack 
                minHeight="700px"
                height="full"
                maxWidth="1300px"
                width="full"
                align='flex-start'
            >
                 <VStack 
                    align='self-start' 
                    alignSelf='self-start' 
                    marginY='20px'
                    color='#1A2B49' 
                    >
                    <Text fontWeight='700' fontSize='xl'>Things to do in</Text>
                    <Text fontWeight='900' fontSize='6xl'>{locationDetail?.title}</Text>
                </VStack>
                <Box width="full">
                    <Maps coordinates={locationDetail?.loc?.coordinates} />
                </Box>
                <Title text='All activities' fontSize='3xl'/>
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
                    {tours?.map((tour) => (
                    <TourCard key={tour?._id} tour={tour} />
                    ))}
                    {tours?.map((tour) => (
                    <TourCard key={tour?._id} tour={tour} />
                    ))}
                </SimpleGrid>
            </VStack>
        </ListTourLayout>   
    )
}

export default observer(ListTourPage)