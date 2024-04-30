"use client";
import { HStack, VStack, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import PageLayout from "components/Layout/WebLayout/PageLayout";
import routes from "routes";
import CartItem from "./CartItem";
import { useStores } from "hooks";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";

const CartPage = () => {
  const { cartStore } = useStores();
  const { authStore } = useStores();
  const { listCart } = cartStore;
  const { isLogin } = authStore;
  const [totalPrice, setTotalPrice] = useState(0);
  const route = useRouter();

  useEffect(() => {
    if (!isLogin) return;
    const fetchData = async () => {
      await cartStore.getListCart();
    };
    fetchData();
  }, []);

  function caculateTourPrice(tourPrice: number): void {
    if (tourPrice) {
      setTotalPrice((prev) => prev + tourPrice);
    }
  }

  function gotoCheckout() {
    route.push(routes.booking.activity);
  }

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
      >
        <VStack width="full" height="full" align="flex-start">
          <Text
            textAlign="start"
            fontSize="2xl"
            color="#5ab6b3"
            paddingLeft="20px"
            fontWeight="bold"
            _before={{
              position: "absolute",
              marginLeft: "-20px",
              borderRadius: "2px",
              content: "''",
              width: "10px",
              height: "30px",
              bg: "#5ab6b3",
            }}
          >
            Shopping Cart
          </Text>
          {listCart &&
            listCart.tours &&
            listCart.tours.map((tour) => (
              <CartItem
                key={tour._id}
                tour={tour}
                idCart={tour._id}
                caculateTourPrice={caculateTourPrice}
              />
            ))}
        </VStack>

        {listCart && listCart.tours && listCart.tours.length && (
          <VStack position="relative" width="full">
            <VStack
              width="full"
              maxWidth="400px"
              height="fit-content"
              bg="#fff"
              boxShadow="lg"
              padding="12px 20px"
              border="2px solid #ccc"
              borderRadius="8px"
              position="fixed"
            >
              <HStack
                width="full"
                justifyContent="space-between"
                spacing={50}
                fontSize="xl"
                fontWeight="bold"
              >
                <Text>Subtotal ({listCart.tours.length} items): </Text>
                <Text>{totalPrice}</Text>
              </HStack>
              <Button
                width="full"
                marginTop="12px"
                padding="23px 18px"
                borderRadius="full"
                background="#38A59F"
                color="white"
                onClick={gotoCheckout}
              >
                Go to check out
              </Button>
              <VStack align="self-start"></VStack>
            </VStack>
          </VStack>
        )}
      </HStack>
      {(!isLogin || !listCart.tours) && (
        <Text fontSize="2xl" fontWeight="bold">
          Your cart is empty{" "}
        </Text>
      )}
    </PageLayout>
  );
};

export default observer(CartPage);
