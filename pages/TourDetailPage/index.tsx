"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Img,
  Menu,
  MenuButton,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useStores } from "hooks";
import { observer } from "mobx-react";
import Icon from "components/Icon";
import "react-calendar/dist/Calendar.css";
import { FaRegCalendarCheck } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { PiClockCountdownBold } from "react-icons/pi";
import { RiMapPinUserLine } from "react-icons/ri";
import { LuCalendarDays } from "react-icons/lu";
import { IoPeople } from "react-icons/io5";
import PageLayout from "components/Layout/WebLayout/PageLayout";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { FaLocationDot } from "react-icons/fa6";
import MenuItem from "./MenuItem";
import CustomCalendar from "./Calendar";
import { IAddToCart, IParticipants } from "interfaces/cart";
import { PLATFORM } from "enums/common";
import Maps from "./Maps";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const TourDetailPage = () => {
  const currentUrl = window.location.href;
  const urlParts = currentUrl.split("/");
  const tourId = urlParts[urlParts.length - 1];
  const [type, setType] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [initialMount, setInitialMount] = useState(true);
  const [guestInfo, setGuestInfo] = useState<IParticipants[]>([]);
  const [selectedDate, setSelectedDate] = useState<Value>(null);
  const [showDate, setShowDate] = useState<string[]>([]);
  const [convertedDate, setConvertedDate] = useState<string>("");
  const [availability, setAvailability] = useState<boolean>(false);
  const [isMenuParticipant, setIsMenuParticipant] = useState<boolean>(true);
  const [isMenuDatePick, setIsMenuDatePick] = useState<boolean>(true);
  const { authStore } = useStores();
  const { tourStore } = useStores();
  const { cartStore } = useStores();
  const { tourDetail, priceOptions, startLocation } = tourStore;
  const userId = localStorage.getItem(`${PLATFORM.WEBSITE}UserId`);

  useEffect(() => {
    tourStore.fetchTourDetail(tourId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourId]);

  useEffect(() => {
    if (!initialMount) {
      const existingGuestIndex = guestInfo.findIndex(
        (obj) => obj.title === type
      );

      if (existingGuestIndex !== -1) {
        const updatedGuestInfo = [...guestInfo];
        updatedGuestInfo[existingGuestIndex] = {
          ...updatedGuestInfo[existingGuestIndex],
          quantity,
          price,
        };
        const filterGuest = updatedGuestInfo.filter(
          (obj) => obj.quantity !== 0 && !!obj.title
        );
        setGuestInfo(filterGuest);
      } else {
        const newGuest: IParticipants = {
          title: type,
          quantity: quantity,
          price: price,
        };
        setGuestInfo((prevGuestInfo) => [...prevGuestInfo, newGuest]);
      }
    } else {
      setInitialMount(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, quantity, price]);

  useEffect(() => {
    if (guestInfo.length === 0) {
      setTotalPrice(0);
      return;
    }
    let totalPrice: number = 0;

    guestInfo.forEach((guest) => {
      console.log(guest.price);
      totalPrice += guest.price;
    });
    setTotalPrice(totalPrice);
  }, [guestInfo]);

  useEffect(() => {
    if (!selectedDate) return;
    console.log(selectedDate);
    var date = new Date(selectedDate.toString());

    var formattedDate =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2);

    console.log(formattedDate);

    const showDate = selectedDate.toString().split(" ").slice(0, 3);
    setShowDate(showDate);
    setConvertedDate(formattedDate.toString());
  }, [selectedDate]);

  let src = "";
  if (tourDetail.images && tourDetail.images.length > 0) {
    src = tourDetail.images.slice(0, 1).toString();
  }

  function handleAddToCart() {
    if (!userId) return;
    console.log("userID: ", userId);
    const participant: IParticipants[] = guestInfo;
    const data: IAddToCart = {
      user: userId,
      tour: {
        tour: tourId,
        startDate: convertedDate,
        startTime: "7:00AM",
        participants: participant,
      },
    };
    cartStore.addToCart(data);
  }

  function handleCheckAvailability() {
    guestInfo.length ? setIsMenuParticipant(true) : setIsMenuParticipant(false);
    showDate.length ? setIsMenuDatePick(true) : setIsMenuDatePick(false);
    setAvailability(!!guestInfo.length && !!showDate.length);
  }
  return (
    <PageLayout>
      <VStack
        maxWidth="1300px"
        width="full"
        align="flex-start"
        spacing={4}
        padding={8}
      >
        <Heading color="gray.800" fontWeight={700} lineHeight={10}>
          {tourDetail.title}
        </Heading>
        <HStack spacing={4}>
          <HStack marginBottom={1}>
            <Icon iconName="yellow-star.svg" size={20} />
            <Icon iconName="yellow-star.svg" size={20} />
            <Icon iconName="yellow-star.svg" size={20} />
            <Icon iconName="yellow-star.svg" size={20} />
            <Icon iconName="yellow-star.svg" size={20} />
          </HStack>
          <Text>4.9 / 5</Text>
          <Text fontSize="sm" textDecoration="underline">
            3456 reviews
          </Text>
        </HStack>
        <Img width="full" height="500px" src={src} borderRadius={8} />
        <HStack width="full" justify="space-between" paddingTop="32px">
          <VStack
            alignSelf="flex-start"
            flex={2}
            width="full"
            align="flex-start"
          >
            <Text fontSize="lg" paddingRight="30px">
              Enchanting by the ethereal beauty and tranquility of the sand
              dunes in Mui Ne. Join us on a surreal journey through nature,
              where destinations beckon you to explore their captivating allure
            </Text>
            <Box width="full">
              <Maps coordinates={startLocation.coordinates} />
            </Box>
            <Text fontSize="2xl" fontWeight="bold" alignSelf="flex-start">
              About this activity
            </Text>
            <HStack align="flex-start" padding="16px">
              <Text fontSize="3xl">
                <FaRegCalendarCheck />
              </Text>
              <VStack align="flex-start">
                <Text fontSize="lg" fontWeight="bold">
                  Free cancellation
                </Text>
                <Text>Cancel up to 24 hours in advance for a full refund</Text>
              </VStack>
            </HStack>
            <HStack align="flex-start" padding="16px">
              <Text fontSize="3xl">
                <FaCreditCard />
              </Text>
              <VStack align="flex-start">
                <Text fontSize="lg" fontWeight="bold">
                  Reserve now & pay later
                </Text>
                <Text>
                  Keep your travel plans flexible — book your spot and pay
                  nothing today.
                </Text>
              </VStack>
            </HStack>
            <HStack align="flex-start" padding="16px">
              <Text fontSize="3xl">
                <PiClockCountdownBold />
              </Text>
              <VStack align="flex-start">
                <Text fontSize="lg" fontWeight="bold">
                  Duration
                </Text>
                <Text>{tourDetail.duration} hours</Text>
              </VStack>
            </HStack>
            <HStack align="flex-start" padding="16px">
              <Text fontSize="3xl">
                <RiMapPinUserLine />
              </Text>
              <VStack align="flex-start">
                <Text fontSize="lg" fontWeight="bold">
                  Live tour guide
                </Text>
                <Text>English</Text>
              </VStack>
            </HStack>
            <Box
              width="full"
              height="fit-content"
              padding="16px"
              background="#1A2B49"
              borderRadius="15px"
            >
              <Text fontSize="2xl" fontWeight="bold" color="#fff">
                Select participant and date
              </Text>
              <HStack
                align="center"
                justifyContent="space-between"
                paddingTop="8px"
              >
                <Box flex={1}>
                  <Menu
                    autoSelect={false}
                    computePositionOnMount
                    placement="bottom-start"
                  >
                    <VStack>
                      <MenuButton
                        width="full"
                        height="40px"
                        background="#fff"
                        borderRadius="999px"
                        padding="8px 12px"
                        fontWeight="bold"
                      >
                        <HStack justifyContent="space-between">
                          <HStack fontSize="md" alignItems="center">
                            <Text fontSize="2xl">
                              <IoPeople />
                            </Text>
                            <Text>
                              {guestInfo.length > 0
                                ? guestInfo.map(
                                    (guest) =>
                                      `${guest.title} x${guest.quantity} `
                                  )
                                : "Select participant"}
                            </Text>
                          </HStack>
                          <TriangleDownIcon />
                        </HStack>
                      </MenuButton>
                    </VStack>
                    <MenuList minWidth="320px" padding="4px 10px">
                      {priceOptions.map((participant) => (
                        <MenuItem
                          key={participant._id}
                          type={participant.title}
                          price={participant.value}
                          setPrice={setPrice}
                          setType={setType}
                          setQuantity={setQuantity}
                        />
                      ))}
                    </MenuList>
                  </Menu>
                  <Text textAlign="center" color="red">
                    {!isMenuParticipant && "Please choose participants"}
                  </Text>
                </Box>

                <Box flex={1}>
                  <Menu
                    autoSelect={false}
                    computePositionOnMount
                    placement="bottom-start"
                  >
                    <MenuButton
                      width="full"
                      height="40px"
                      background="#fff"
                      borderRadius="999px"
                      padding="8px 12px"
                      fontWeight="bold"
                    >
                      <HStack justifyContent="space-between">
                        <HStack fontSize="md" alignItems="center">
                          <Text fontSize="2xl">
                            <LuCalendarDays />
                          </Text>
                          <Text>
                            {!selectedDate ? "Select date" : `${showDate}`}
                          </Text>
                        </HStack>
                        <TriangleDownIcon />
                      </HStack>
                    </MenuButton>

                    <MenuList>
                      <HStack spacing={8}>
                        <CustomCalendar
                          selectedDate={selectedDate}
                          setSelectedDate={setSelectedDate}
                        />
                      </HStack>
                    </MenuList>
                  </Menu>
                  <Text textAlign="center" color="red">
                    {!isMenuDatePick && "Please select date"}
                  </Text>
                </Box>

                <Button
                  colorScheme="blue"
                  borderRadius="80px"
                  flex={1}
                  onClick={handleCheckAvailability}
                >
                  Check availability
                </Button>
              </HStack>
            </Box>
            <Box
              width="full"
              height="fit-content"
              border="2px solid #0071EB"
              borderRadius="15px"
              display={availability ? "block" : "none"}
            >
              <VStack align="flex-start">
                <VStack
                  align="flex-start"
                  width="full"
                  padding="24px 24px 0px"
                  _after={{
                    content: "''",
                    width: "full",
                    height: "2px",
                    marginTop: "10px",
                    color: "#ccc",
                    background: "#ccc",
                  }}
                >
                  <Text fontSize="2xl" fontWeight="bold">
                    {tourDetail.title}
                  </Text>
                  <HStack>
                    <PiClockCountdownBold size="1.5rem" />
                    <Text fontSize="md">
                      Duration: {tourDetail.duration} hours
                    </Text>
                  </HStack>
                  <HStack>
                    <FaLocationDot size="1.5rem" />
                    <Text fontSize="md">Meet at {startLocation.address} </Text>
                  </HStack>
                </VStack>
                <VStack width="50%" align="flex-start" margin="16px 24px 24px">
                  <Text fontSize="xl" fontWeight="bold">
                    Price breakdown
                  </Text>
                  {guestInfo.map((guest) => (
                    <HStack
                      key={guest.title}
                      width="100%"
                      justifyContent="space-between"
                    >
                      <Text fontSize="lg">
                        {guest.title} {guest.quantity} x{" "}
                        {guest.price / guest.quantity}
                      </Text>
                      <Text fontSize="lg">{guest.price}</Text>
                    </HStack>
                  ))}
                </VStack>
                <Box
                  width="full"
                  height="fit-content"
                  background="#EBEEF1"
                  padding="24px 20px"
                  borderBottomRadius="15px"
                >
                  <HStack justify="space-between" padding="4px 8px">
                    <VStack align="flex-start">
                      <Text fontSize="md" fontWeight="bold">
                        Total price
                      </Text>
                      <Text fontSize="2xl" fontWeight="bold">
                        {totalPrice !== 0 ? `${totalPrice} VND` : ""}
                      </Text>
                    </VStack>
                    <HStack>
                      <Button background="#B2F5EA" onClick={handleAddToCart}>
                        Add to cart
                      </Button>
                      <Button background="#B2F5EA">Book now</Button>
                    </HStack>
                  </HStack>
                </Box>
              </VStack>
            </Box>
          </VStack>
          <VStack alignSelf="flex-start" width="full" flex={1}>
            <VStack
              width="100%"
              align="flex-start"
              padding={4}
              border="3px solid #DCDFE4"
              borderTopColor="#0071EB"
              borderRadius={2}
              spacing={0}
            >
              <Text>From</Text>
              <HStack width="full" justify="space-between">
                <Text fontSize="2xl" fontWeight={700}>
                  {tourDetail.regularPrice}
                </Text>
                <Button colorScheme="blue" borderRadius="80px" width="60%">
                  Check availability
                </Button>
              </HStack>
              <Text>per person</Text>
              <HStack marginTop="24px !important" spacing={6}>
                <Icon iconName="card.svg" size={40} />
                <Text fontSize="sm">
                  Reserve now & pay later to book your spot and pay nothing
                  today
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </HStack>
      </VStack>
    </PageLayout>
  );
};

export default observer(TourDetailPage);
