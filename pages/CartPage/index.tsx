"use client";
import { HStack, VStack, Text, Button, Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation"; 
import PageLayout from "components/Layout/WebLayout/PageLayout";
import routes from "routes";
import CartItem from "./CartItem";
import { useStores } from "hooks";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import Title from "components/Title";
import { formatCurrency } from "utils/common";
import { FaShoppingCart } from "react-icons/fa";

interface IPriceList {
  id: string;
  price: number;
}

const CartPage = () => {
  const { cartStore, authStore } = useStores(); 
  const { listCart } = cartStore;
  const { isLogin } = authStore;
  const [totalPrice, setTotalPrice] = useState(0);

  const router = useRouter();

  useEffect(() => { 
    cartStore.getListCart();
  }, []); 

  const calculateTotalPrice = () => {
    let total = 0;
    if (listCart && listCart.tours) {
      listCart.tours.forEach((tour) => {
        tour.participants.map((participant) => {
          total += participant.price * participant.quantity
        })
      });
    }
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [listCart]);

  const gotoCheckout = () => {
    router.push(routes.booking.activity);
  };

  return (
    <PageLayout>
      <HStack
        maxWidth="1400px"
        minHeight="700px"
        marginTop="48px"
        width="full"
        height="full"
        align="flex-start"
        justifyContent="space-between"
        padding="8px 20px"
        spacing={10}
      >
         {listCart?.tours?.length !== 0 ? (
          <VStack width="full" height="full" align="flex-start">
            <Title text='Shopping cart'/>
            {listCart?.tours?.map((tour) => (
              <CartItem
                key={tour._id}
                idCart={tour._id}
                tour={tour}
              />
            ))}
          </VStack>
        ) : (
          <VStack width="full" height="full" align="center">
            <Box color="teal.500" fontSize="9xl">
              <FaShoppingCart />
            </Box>
            <Text fontSize='4xl' fontWeight='bold' color='teal.700'>Your cart is empty</Text>
          </VStack>
        )}

        {listCart?.tours?.length !== 0 && (
          <VStack position="relative" width="full" align='flex-start' >
            <Title text='Total'/>
            <VStack
              width="full"
              maxWidth="400px"
              height="fit-content"
              bg="#fff"
              boxShadow="lg"
              padding="12px 20px"
              border="2px solid #ccc"
              borderRadius="8px"
            >
              <HStack
                width="full"
                justifyContent="space-between"
                fontSize="lg"
                fontWeight="bold"
              >
                <Text>Subtotal ({listCart?.tours?.length} items): </Text>
                <Text>{formatCurrency(totalPrice)}</Text>
              </HStack>
              <Button
                width="full"
                marginTop="12px"
                padding="23px 18px"
                borderRadius="full"
                colorScheme="teal"
                color="white"
                onClick={gotoCheckout}
              >
                Checkout
              </Button>
            </VStack>
          </VStack>
        )}
      </HStack>
    </PageLayout>
  );
};

export default observer(CartPage);
