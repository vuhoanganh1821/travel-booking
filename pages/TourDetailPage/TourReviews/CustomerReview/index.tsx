import { Avatar, HStack, VStack, Text } from "@chakra-ui/react"
import RatingStart from "components/RatingStart"
import dayjs from "dayjs"
import { Content } from "next/font/google"

interface ICustomnerReview {
    ratingStar: number
    avatarImg: string
    username: string
    createDate: Date
    comment: string
}

const CustomnerReview = (props: ICustomnerReview) => {
    const {ratingStar, avatarImg, username, createDate, comment} = props
    return(
        <VStack align='flex-start'> 
            <RatingStart sizeStar={24} sizeText="sm" isShowDetail={false} ratingAverate={ratingStar} numOfrating={1}/>
            <HStack>
                <Avatar src={`${avatarImg}`}/>
                <VStack align='flex-start'>
                <Text>{username}</Text>
                <Text>{dayjs(`${createDate}`).format('YYYY-MM-DD')} - Verified booking</Text>
                </VStack>
            </HStack>
            <Text>{comment}</Text>
        </VStack>         
    )
}

export default CustomnerReview  