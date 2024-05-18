import { HStack, VStack, Text, Image, Button } from "@chakra-ui/react";
import TextField from "components/TextField";
import { ITourCart } from "interfaces/cart";
import { IDiscountItem } from "interfaces/checkout";
import { useState, useEffect } from "react";
import { IoTimerOutline } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { formatCurrency } from "utils/common";

interface IOderItem {
  tour: ITourCart
  discountitem?: IDiscountItem[]
}

const OrderItem = (props: IOderItem) => {
  const { tour, discountitem } = props
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    if (tour.participants.length === 0) {
      setTotalPrice(0)
      return
    }
    let totalPrice: number = 0

    tour.participants.forEach((guest) => {
      totalPrice += guest.price * guest.quantity;
    });
    setTotalPrice(totalPrice);
  }, [tour.participants]);

  return (
    <HStack
      width="full"
      align="self-start"
      border="2px solid #ccc"
      boxShadow="lg"
      background="#fff"
      padding="32px"
      borderRadius="8px"
      spacing={10}
    >
      <Image
        width="200px"
        borderRadius="8px"
        src={`${tour.tour.thumbnail}`}
        alt="img"
      />
      <VStack align="flex-start">
        <Text fontSize="xl" fontWeight="bold">
          {`${tour.tour.title}`}
        </Text>
        <HStack>
          <Text color="#396973" fontSize="2xl" fontWeight="500">
            {discountitem && discountitem.length !== 0
              ? formatCurrency(discountitem[0].tour.totalPrice -
                               discountitem[0].tour.discountPrice)
              : formatCurrency(totalPrice)}
          </Text>
          <Text
            textAlign="inherit"
            fontSize="md"
            fontWeight="500"
            textDecoration="line-through"
            opacity="0.55"
          >
            {discountitem && discountitem.length !== 0
              ? formatCurrency(discountitem[0].tour.totalPrice)
              : ""}
          </Text>
        </HStack>
        <HStack fontSize="md" fontWeight="bold">
          <IoTimerOutline />
          <Text>{`${tour.startDate.slice(0, 10)}`}</Text>
        </HStack>
        <HStack>
          <MdPeopleAlt />

          {tour.participants.map((participant) => (
            <Text fontSize="md" fontWeight="bold" key={participant.title}>
              {participant.quantity} {participant.title}
            </Text>
          ))}
        </HStack>
      </VStack>
    </HStack>
  )
}

export default OrderItem
