"use client"
import { Button, HStack, SimpleGrid, VStack } from "@chakra-ui/react"
import { usePathname, useSearchParams } from 'next/navigation'
import ListTourLayout from "components/Layout/WebLayout/ListTourLayout"
import Title from "components/Title"
import { useEffect, useState } from "react"
import { useStores } from "hooks"
import FilterPrice from "./FilterPrice"
import FilterDuration from "./FilterDuration"
import FilterTime from "./FilterTime"
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import TourCard from "components/TourCard"
import { observer } from "mobx-react"
import FilterStar from "./FilterStar"
import Pagination from "components/Table/components/Pagination"
import { IPagination } from "components/Table"

export interface IApplyFilter {
    priceMin: number
    priceMax: number
    duration: number
    time: number
    star: number
}

const AllActivitiesPage = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { tourStore } = useStores()
    const { tours, totalCount } = tourStore;
    const [searchResult, setSearchResult] = useState<string>("");
    const [pageIndex, setPageIndex] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)
    const [filterOptions, setFliterOptions] = useState<IApplyFilter>({} as IApplyFilter)
    const pagination: IPagination = { pageIndex, tableLength: totalCount, gotoPage: setPageIndex }

    useEffect(() => {
        const search = searchParams?.get('search')
        if(search){
            setSearchResult(search)
        }
    }, [pathname, searchParams])

    useEffect(() => {
        tourStore.fetchActiveTours(pageIndex);
      }, [pageIndex]);

    useEffect(() => {   
        let filter = ""
        filter += filterOptions.priceMax ? `regularPrice[lt]=${filterOptions.priceMax}&` : ''
        filter += filterOptions.priceMin ? `regularPrice[gt]=${filterOptions.priceMin}&` : ''
        filter += filterOptions.star ? `ratingAverage[gt]=${filterOptions.star}&` : ''
        filter += filterOptions.duration ? `duration[gt]=${filterOptions.duration}&` : ''

        tourStore.fetchActiveTours(pageIndex, filter)
    }, [filterOptions])

    return(
        <ListTourLayout>
            <VStack
              minHeight="700px"
              height="full"
              maxWidth="1300px"
              width="full"
              align='flex-start'
            >
                <Title text={searchResult === "" ? "All activities" : `Result for "${searchResult}"`} fontSize='3xl'/>
                <HStack width='full' justify='space-between'>
                    <HStack spacing={5}>
                        <FilterPrice setFliterOptions={setFliterOptions}/>
                        <FilterDuration setFliterOptions={setFliterOptions}/>
                        {/* <FilterTime setFliterOptions={setFliterOptions}/> */}
                        <FilterStar setFliterOptions={setFliterOptions}/> 
                    </HStack>
                    {/* <Button height={50} border='2px solid #dcdfe4' bg='transparent'>{<TbAdjustmentsHorizontal size={24}/>} Filters</Button> */}
                </HStack>
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
                <Pagination pagination={pagination} pageSize={4} setPageSize={setPageSize}/>
            </VStack>
        </ListTourLayout>
    )
}

export default observer(AllActivitiesPage)