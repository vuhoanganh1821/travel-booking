"use client";
import {
  HStack,
  VStack,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import { observer } from "mobx-react";
import { useRouter } from "next/navigation";
import routes from "routes";
import {toast} from 'react-toastify'
import PageLayout from "components/Layout/WebLayout/PageLayout";
import BookingStatus from "../../components/BookingStatus";
import TextField from "components/TextField";
import OrderItem from "./OrderItem";
import { useStores } from "hooks";
import { useEffect, useState, ChangeEvent } from "react";
import { IRequestTour, IRequsetCheckoutReview } from "interfaces/checkout";
import Title from "components/Title";
import { formatCurrency } from "utils/common";

const CheckoutPage = () => {
  const route = useRouter();
  const { checkoutStore, cartStore, authStore, bookingStore } = useStores();
  const [coupon, setCoupon] = useState<string>("");
  const [checkCoupon, setCheckCoupon] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataCheckoutReview, setDataCheckoutReview] = useState<IRequsetCheckoutReview>({} as IRequsetCheckoutReview);
  const { listCart, selectedCart } = cartStore;
  const { checkout, order, itemPrice } = checkoutStore;
  const { isLogin } = authStore;
  const { responeBookNow } = bookingStore;

  useEffect(() => {
    if(!listCart && !selectedCart) return;
    const cartId = listCart._id;
    const tourInfo: IRequestTour[] = [];
    if (responeBookNow && responeBookNow.tours){
      const data = responeBookNow
      setDataCheckoutReview(data)
      return
    }else if (selectedCart.length !== 0) {
      selectedCart.forEach((tour) =>
        tourInfo.push({
          tour: tour.tour,
          startDate: tour.startDate.slice(0, 10),
        })
      );
      setDataCheckoutReview({cart: cartId, tours: tourInfo})
      return
    } else if (listCart && listCart.tours) {
      setDataCheckoutReview({cart: cartId})
      return
    } 
  }, [listCart, selectedCart, responeBookNow])

  useEffect(() => {
    if (!isLogin) {
      return;
    }
    cartStore.fetchCartCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataCheckoutReview?.cart) {
      checkoutStore.fetchCheckoutReview(dataCheckoutReview);
    }
  }, [dataCheckoutReview]);

  useEffect(() => {
    if(checkCoupon){
      if(order.discount === 0)
        toast.error('Not found discount match with tour')
      else if (checkout.length > itemPrice.length)
        toast.warn("Some tours can't apply this discount")
      else
        toast.success('Apply discount successfully')
    }
  }, [coupon, checkCoupon])

  const handleGoToContactPage = () => {
    checkoutStore.setOrderSummary({...dataCheckoutReview, discountCode: coupon})
    route.push(routes.booking.contact)
  }
  const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    setCoupon(event.target.value);
  };

  const handleApplyCoupon = async(): Promise<void> => {
    try{
      if(coupon.length == 0){
        toast.info('Please enter discount code')
        return;
      }
      setIsLoading(true)
      const dataCoupon = { ...dataCheckoutReview, discountCode: coupon };
      await checkoutStore.fetchCheckoutReview(dataCoupon);
      setIsLoading(false)
      setCheckCoupon(true)
    }catch{
      setIsLoading(false)
    }
  };

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
           <Title text='Your order'/>

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
            <Title text='Total order'/>

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
                  <Text>{checkout.length > 1 ? 'Total items' : "Total item"}</Text>
                  <Text>{checkout.length}</Text>
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
                  <VStack align='flex-end'>
                    <Text fontSize="2xl" color="#396973">
                      {itemPrice && itemPrice.length !== 0
                        ? order.totalOrder && formatCurrency(order.totalOrder - order.discount): 
                          order.totalOrder &&formatCurrency(order.totalOrder)}
                    </Text>
                    <Text
                      fontSize="sm"
                      textDecoration="line-through"
                      opacity="0.5"
                    >
                      {itemPrice && itemPrice.length !== 0
                        ? order.totalOrder && formatCurrency(order.totalOrder)
                        : ""}
                    </Text>
                  </VStack>
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
                  isLoading={isLoading}
                >
                  Apply
                </Button>
              </HStack>
              <Button color="#fff" bg="#64CCC5" width="full" onClick={handleGoToContactPage}>
                Confirm and continue
              </Button>
            </VStack>
          </VStack>
        </HStack>
      </VStack>
    </PageLayout>
  );
};

export default observer(CheckoutPage);
