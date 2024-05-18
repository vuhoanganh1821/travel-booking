import { HStack, Text } from "@chakra-ui/react"
import { CustomRatingStar } from "components/Layout/WebLayout/components/CustomRatingStar";
import Icon from "components/Icon";

interface IRatingStart {
    sizeStar: number
    sizeText: string
    isShowDetail?: boolean
    ratingAverate: number
    numOfrating: number
}

const RatingStart = (props: IRatingStart) => {
    const {sizeStar, ratingAverate, numOfrating, sizeText, isShowDetail = true} = props
    return(
      <HStack fontWeight='bold'>
         <HStack spacing={0.5}>
          {Array.from(Array(5)).map((_, index) => {
            const starSerialNumber = index + 1

            if (starSerialNumber <= Math.floor(ratingAverate)) {
              return <CustomRatingStar key={starSerialNumber} size={sizeStar} filling={1}/>
            }

            if (starSerialNumber > Math.ceil(ratingAverate)) {
              return <CustomRatingStar key={starSerialNumber} size={sizeStar} filling={0} />
            }

            const filling = ratingAverate - index
            return <CustomRatingStar key={starSerialNumber} size={sizeStar} filling={filling} />
          })}
        </HStack>
        <HStack fontSize={`${sizeText}`} display={isShowDetail ? 'block' : 'none'}>
          <Text>{ratingAverate} / 5   </Text>
          <Text color='#888'>{numOfrating} reviews</Text>
        </HStack>
      </HStack>
     
    )
}

export default RatingStart