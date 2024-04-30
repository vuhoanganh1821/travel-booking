"use client";
import {
  HStack,
  VStack,
  Text,
  Box,
  Menu,
  MenuButton,
  MenuList,
  Image,
  Button,
} from "@chakra-ui/react";
import { observer } from "mobx-react";
import PageLayout from "components/Layout/WebLayout/PageLayout";
import BookingStatus from "./BookingStatus";
import TextField from "components/TextField";
import OrderItem from "./OrderItem";
import { useStores } from "hooks";
import { useEffect, useState, ChangeEvent } from "react";
import { IRequestTour, IRequsetCheckoutReview } from "interfaces/checkout";

const BookingPage = () => {
  const { checkoutStore, cartStore, authStore } = useStores();
  const [coupon, setCoupon] = useState<string>("");
  const { listCart, selectedCart } = cartStore;
  const { checkout, order, itemPrice } = checkoutStore;
  const { isLogin } = authStore;

  const cartId = listCart._id;
  const tourInfo: IRequestTour[] = [];
  if (selectedCart.length !== 0) {
    selectedCart.forEach((tour) =>
      tourInfo.push({
        tour: tour.tour,
        startDate: tour.startDate.slice(0, 10),
      })
    );
  } else {
    if (listCart && listCart.tours) {
      listCart.tours.forEach((tour) =>
        tourInfo.push({
          tour: tour.tour._id,
          startDate: tour.startDate.slice(0, 10),
        })
      );
    }
  }
  const data: IRequsetCheckoutReview = {
    cart: cartId,
    tours: tourInfo,
  };

  const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    setCoupon(event.target.value);
    console.log(coupon);
  };

  const handleApplyCoupon = () => {
    console.log(coupon);
    const dataCoupon = { ...data, discountCode: coupon };
    checkoutStore.fetchCheckoutReview(dataCoupon);
    console.log("itemPrice", itemPrice);
  };

  useEffect(() => {
    if (!isLogin) {
      return;
    }
    cartStore.fetchCartCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("selectedCart", selectedCart);
    checkoutStore.fetchCheckoutReview(data);
  }, [listCart]);

  return (
    <PageLayout>
      <VStack
        minHeight="700px"
        height="full"
        maxWidth="1300px"
        width="full"
        padding="24px"
      >
        <BookingStatus currentPage="booking" />
        <HStack
          width="full"
          justify="space-between"
          marginTop="48px"
          align="flex-start"
        >
          <VStack
            width="full"
            flex="2"
            paddingRight="32px"
            align="flex-start"
            spacing={7}
          >
            <Text
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
              Your order
            </Text>

            {checkout &&
              checkout.map((tour) => (
                <OrderItem
                  key={tour.tour._id}
                  tour={tour}
                  discountitem={itemPrice.filter(
                    (item) => item.tour.tourId === tour.tour._id
                  )}
                />
              ))}
          </VStack>
          <VStack
            position="relative"
            align="flex-start"
            flex="1"
            marginLeft="48px"
          >
            <Text
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
              Order summary
            </Text>
            <VStack
              position="relative"
              width="full"
              border="2px solid #ccc"
              padding="32px"
              bg="#fff"
              boxShadow="lg"
              borderRadius="8px"
              align="flex-start"
              fontSize="lg"
              fontWeight="600"
              spacing={10}
            >
              <Box
                width="full"
                _after={{
                  position: "absolute",
                  content: "''",
                  width: "84%",
                  height: "2px",

                  background: "#ccc",
                  overflow: "hidden",
                }}
              >
                <HStack fontSize="xl" width="full" justify="space-between">
                  <Text>Total items</Text>
                  <Text>3</Text>
                </HStack>
              </Box>

              <Box
                width="full"
                _after={{
                  position: "absolute",
                  content: "''",
                  width: "84%",
                  height: "2px",

                  background: "#ccc",
                  overflow: "hidden",
                }}
              >
                <HStack fontSize="xl" width="full" justify="space-between">
                  <Text>Total price</Text>
                  <HStack>
                    <Text fontSize="2xl" color="#396973">
                      {order.totalOrder}
                    </Text>
                    <Text
                      fontSize="sm"
                      textDecoration="line-through"
                      opacity="0.5"
                    >
                      {itemPrice && itemPrice.length !== 0
                        ? itemPrice[0].tour.totalPrice
                        : ""}
                    </Text>
                  </HStack>
                </HStack>
              </Box>
              {itemPrice.length > 0 && (
                <>
                  <HStack
                    width="full"
                    justify="space-between"
                    padding="2px"
                    border="2px dashed #ccc"
                    fontSize="sm"
                    // visible="false"
                  >
                    {" "}
                    <Text>Applied coupon: {coupon}</Text>
                    <Button
                      background="transparent"
                      _hover={{ background: "transparent", opacity: "0.5" }}
                    >
                      X
                    </Button>{" "}
                  </HStack>
                </>
              )}
              <HStack width="full" justify="space-between">
                <TextField
                  placeholder="Enter coupon"
                  flex="2"
                  value={coupon}
                  onChange={handleChangeText}
                />
                <Button
                  color="#fff"
                  bg="#64CCC5"
                  paddingY="12px"
                  flex={1}
                  onClick={handleApplyCoupon}
                >
                  Apply
                </Button>
              </HStack>
              <Button color="#fff" bg="#64CCC5" width="full">
                Confirm and continue
              </Button>
            </VStack>
          </VStack>
        </HStack>
      </VStack>
    </PageLayout>
  );
};

export default observer(BookingPage);
