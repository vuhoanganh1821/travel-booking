import { HStack, Text } from "@chakra-ui/react"
import { CustomRatingStar } from "components/Layout/WebLayout/components/CustomRatingStar";
import Icon from "components/Icon";

interface IRatingStart {
    sizeStar?: number
    sizeText?: string
    isShowDetail?: boolean
    ratingAverage?: number
    numOfRating?: number
}

const RatingStart = (props: IRatingStart) => {
    const {sizeStar = 24, ratingAverage = 0, numOfRating = 0, sizeText, isShowDetail = true} = props
    return(
      <HStack fontWeight='bold'>
         <HStack spacing={0.5}>
          {Array.from(Array(5)).map((_, index) => {
            const starSerialNumber = index + 1

            if (starSerialNumber <= Math.floor(ratingAverage)) {
              return <CustomRatingStar key={starSerialNumber} size={sizeStar} filling={1}/>
            }

            if (starSerialNumber > Math.ceil(ratingAverage)) {
              return <CustomRatingStar key={starSerialNumber} size={sizeStar} filling={0} />
            }

            const filling = ratingAverage - index
            return <CustomRatingStar key={starSerialNumber} size={sizeStar} filling={filling} />
          })}
        </HStack>
        <HStack fontSize={`${sizeText}`} display={isShowDetail ? 'block' : 'none'}>
          <Text>{ratingAverage.toFixed(1)} / 5   </Text>
          <Text color='#888'>{numOfRating} reviews</Text>
        </HStack>
      </HStack>
     
    )
}

export default RatingStart