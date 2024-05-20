"use client";
import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { toast } from 'react-toastify'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { observer } from "mobx-react";
import { useRouter } from "next/navigation";
import { useStores } from "hooks";
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
import MenuItem from "components/Layout/WebLayout/components/MenuItem";
import CustomCalendar from "./Calendar";
import { IAddToCart, IParticipants } from "interfaces/cart";
import { PLATFORM } from "enums/common";
import Maps from "./Maps";
import RatingStart from "components/RatingStart";
import { formatCurrency } from "utils/common";
import routes from "routes";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Title from "components/Title";
import TourReviews from "./TourReviews";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];



const TourDetailPage = () => {
  
  const route = useRouter()
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tourId, setTourId] = useState<string>()
  const [slider, setSlider] = useState<Slider | null>(null)
  const { tourStore, cartStore, bookingStore } = useStores();
  const { tourDetail, priceOptions, startLocation } = tourStore;
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };
  const userId = localStorage.getItem(`${PLATFORM.WEBSITE}UserId`);
  const top = useBreakpointValue({ base: '90%', md: '50%' })
  const side = useBreakpointValue({ base: '30%', md: '10px' })

  useEffect(() => {
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split("/");
    setTourId(urlParts[urlParts.length - 1])
  }, [])

  useEffect(() => {
    if(tourId){
      tourStore.fetchTourDetail(tourId);
    }
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
      totalPrice += guest.price;
    });
    setTotalPrice(totalPrice);
  }, [guestInfo]);

  useEffect(() => {
    if (!selectedDate) return;
    var date = new Date(selectedDate.toString());

    var formattedDate =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2);

    const showDate = selectedDate.toString().split(" ").slice(0, 3);
    setShowDate(showDate);
    setConvertedDate(formattedDate.toString());
  }, [selectedDate]);


  async function handleAddToCart(): Promise<void> {
    try{
      if(guestInfo.length === 0){
        toast.error("Please select participants")
        return
      }
      if (userId){
        const participant: IParticipants[] = guestInfo;
        const data: IAddToCart = {
          user: userId,
          tour: {
            tour: tourId ?? '',
            startDate: convertedDate,
            startTime: "7:00AM",
            participants: participant,
          },
        };
        setIsLoading(true)
        await cartStore.addToCart(data)
        setIsLoading(false)
        toast.success('Add to cart successfully')
        window.scrollTo({ top: 0, behavior: 'smooth' });
        route.refresh()
      }else{
        toast.warning("Please login first")
        setIsLoading(false)
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return
      }
    }catch{
      setIsLoading(false)
      toast.error('Add to cart failed!')
    }
  }

  async function handleBookNow(): Promise<void> {
    try{
      if(guestInfo.length === 0){
        toast.error("Please select participants")
        return
      }
      setIsLoading(true)
      if (userId){
        const participant: IParticipants[] = guestInfo;
        const data: IAddToCart = {
          user: userId,
          tour: {
            tour: tourId ?? '',
            startDate: convertedDate,
            startTime: "7:00AM",
            participants: participant,
          },
        };
        await bookingStore.createBookNow(data)
        setIsLoading(false)
        route.push(routes.booking.activity)
      } else{
        toast.warning("Please login first")
        setIsLoading(false)
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return
      }
    }catch{
      setIsLoading(false)
      toast.error('Book now failed!')
    }
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
          {tourDetail?.title}
        </Heading>
        <RatingStart sizeStar={24} sizeText="md" ratingAverage={tourDetail?.ratingAverage} numOfRating={tourDetail?.numOfRating}/>
        <Box position={'relative'} height={'600px'} width={'full'} overflow={'hidden'}>
          <IconButton
            aria-label="left-arrow"
            colorScheme="messenger"
            borderRadius="full"
            position="absolute"
            left={side}
            top={top}
            transform={'translate(0%, -50%)'}
            zIndex={2}
            onClick={() => slider?.slickPrev()}
          >
          <BiLeftArrowAlt />
          </IconButton>
          {/* Right Icon */}
          <IconButton
            aria-label="right-arrow"
            colorScheme="messenger"
            borderRadius="full"
            position="absolute"
            right={side}
            top={top}
            transform={'translate(0%, -50%)'}
            zIndex={2}
            onClick={() => slider?.slickNext()}
          >
            <BiRightArrowAlt />
          </IconButton>
          <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {tourDetail?.images?.map((url, index) => (
            <Image
              key={index}
              height={'xl'}
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              borderRadius='12px'
              backgroundImage={`url(${url})`}
            />
          ))}
          </Slider>
        </Box>

        
        <HStack width="full" justify="space-between" paddingTop="32px">
          <VStack
            alignSelf="flex-start"
            flex={2}
            width="full"
            align="flex-start"
          >
            <Text fontSize="lg" paddingRight="30px">
              {tourDetail?.summary}
            </Text>
            <Box width="full">
              <Maps coordinates={startLocation?.coordinates} />
            </Box>
            <Title text='About this activity'/> 
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
                <Text>{tourDetail?.duration} hours</Text>
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
                      {priceOptions && priceOptions.map((participant) => (
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
                  colorScheme="teal"
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
              border="2px solid teal"
              borderRadius="15px"
              display={availability ? "block" : "none"}
            >
              <VStack align="flex-start">
                <VStack
                  fontWeight='500'
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
                    {tourDetail?.title}
                  </Text>
                  <HStack>
                    <PiClockCountdownBold size="1.5rem" />
                    <Text fontSize="md">
                      Duration: {tourDetail?.duration} hours
                    </Text>
                  </HStack>
                  <HStack>
                    <FaLocationDot size="1.5rem" />
                    <Text fontSize="md">Meet at {startLocation?.address} </Text>
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
                      <Text fontWeight='500' fontSize="lg">
                        {guest.title} {guest.quantity} x{" "}
                        {formatCurrency(guest.price / guest.quantity)}
                      </Text>
                      <Text fontWeight='500' fontSize="lg">{guest.price && formatCurrency(guest.price)}</Text>
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
                        {totalPrice !== 0 ? `${totalPrice && formatCurrency(totalPrice)}` : ""}
                      </Text>
                    </VStack>
                    <HStack>
                      <Button color='#fff' colorScheme="teal" onClick={handleAddToCart} isLoading={isLoading}>
                        Add to cart
                      </Button>
                      <Button color='#fff' colorScheme="teal" onClick={handleBookNow} isLoading={isLoading}>
                        Book now
                      </Button>
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
              borderTopColor="teal"
              borderRadius={2}
              spacing={0}
            >
              <Text>From</Text>
              <HStack width="full" justify="space-between">
                <Text fontSize="2xl" fontWeight={700} flex={2}>
                  {tourDetail?.regularPrice && formatCurrency(tourDetail?.regularPrice)}
                </Text>
                <Button colorScheme="teal" borderRadius="80px" paddingX={8} width="60%" flex={1}>
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
        <Divider borderColor="#888"/>
        //customer reviews
        <Title text='Customer reviews'/>
        <TourReviews tourId={`${tourDetail?._id}`} ratingAverage={tourDetail?.ratingAverage ?? 0} numOfRating={tourDetail?.numOfRating ?? 0}/>
      </VStack>
    </PageLayout>
  );
};

export default observer(TourDetailPage);
