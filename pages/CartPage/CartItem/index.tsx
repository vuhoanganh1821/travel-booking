import {
  HStack,
  VStack,
  Text,
  Image,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuList,
  Checkbox,

} from "@chakra-ui/react";
import { observer } from "mobx-react";
import { useRouter } from "next/navigation";
import { TfiTicket } from "react-icons/tfi";
import { IoPeople, IoTimerOutline } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { FaTrashAlt } from "react-icons/fa";
import {
  IDeleteCart,
  IParticipants,
  ITourCart,
  IUpdateToCart,
} from "interfaces/cart";
import { useEffect, useState } from "react";
import { LuCalendarDays } from "react-icons/lu";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { FaCheckSquare } from "react-icons/fa";
import { useStores } from "hooks";
import CustomCalendar from "components/Layout/WebLayout/components/Calendar";
import MenuItem from "components/Layout/WebLayout/components/MenuItem";
import { PLATFORM } from "enums/common";
import { ISelectedCart } from "interfaces/checkout";
import { formatCurrency } from "utils/common";

interface ICartItem {
  tour: ITourCart;
  idCart: string;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CartItem = (props: ICartItem) => {
  const { tour, idCart } = props;
  const route = useRouter()
  const [convertDate, setConvertDate] = useState<string>();
  const [tourPrice, setTourPrice] = useState<number>(0);
  const [prevPrice, setPrevPrice] = useState<number>(0);
  const [editTour, setEditTour] = useState<boolean>(false);
  const [guestInfo, setGuestInfo] = useState<IParticipants[]>([]);
  const [selectedDate, setSelectedDate] = useState<Value>(null);
  const [showDate, setShowDate] = useState<string[]>([]);
  const [updateDate, setUpdateDate] = useState<string>(tour.startDate);

  const [type, setType] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [initialMount, setInitialMount] = useState(true);
  const [checked, setChecked] = useState<boolean>(false);

  const { cartStore, tourStore } = useStores();
  const { listCart } = cartStore;
  const { tourDetail } = tourStore

  useEffect(() => {
    tourStore.fetchTourDetail(tour.tour._id)
  }, [tour.tour._id])

  useEffect(() => {
    const filteredTours = tour.participants.map((tour) => ({
      title: tour.title,
      quantity: tour.quantity,
      price: tour.price,
    }));
    setGuestInfo(filteredTours);
  }, [tour.participants]);

  useEffect(() => {
    const timeStamp: string = tour.startDate;
    const date: Date = new Date(timeStamp);
    const formattedDate: string = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    setConvertDate(formattedDate);
  }, [tour.startDate]);

  useEffect(() => {
    let totalPrice = 0;

    tour.participants.forEach((tour) => {
      totalPrice += tour.price * tour.quantity;
    });
    
    setTourPrice(totalPrice);
  }, [tour.participants]);

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
    setUpdateDate(formattedDate.toString());
  }, [selectedDate]);

  function handleEditTour() {
    setEditTour((prev) => !prev);
  }

  function handleCommand() {
    const userId = localStorage.getItem(`${PLATFORM.WEBSITE}UserId`);
    if (userId) {
      if (editTour) {
        const data: IUpdateToCart = {
          user: userId,
          tour: {
            itemId: tour._id,
            startDate: updateDate,
            startTime: "7h00",
            participants: guestInfo,
          },
        };
        cartStore.updateCart(data);
        handleEditTour();
      } else {
        const data: IDeleteCart = {
          cart: listCart._id,
          itemId: idCart,
        };
        cartStore.deleteCart(data);
        route.refresh()
      }
    }
  }

  const setSelected = (): void => {
    const data: ISelectedCart = {
      tour: tour.tour._id,
      startDate: tour.startDate,
    };

    cartStore.setSelectedCart(data);
  };

  const notSetSelected = (): void => {
    cartStore.unSetSelectedCart(tour._id);
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      setSelected();
    } else {
      notSetSelected();
    }
  };
  return (
    <HStack
      height="full"
      position="relative"
      justifyContent="space-between"
      spacing={9}
    >
      <VStack
        height="full"
        _before={{
          position: "absolute",
          content: "''",
          width: "14px",
          borderRadius: "2px",
          top: 3,
          height: "42%",
          background: checked ? "#38A59F" : "#c4c4c4"  ,
        }}
        _after={{
          position: "absolute",
          content: "''",
          width: "14px",
          borderRadius: "2px",
          bottom: 3,
          height: "42%",
          background:  checked ? "#38A59F" : "#c4c4c4",
        }}
      >
        <Checkbox
          size="lg"
          isChecked={checked}
          onChange={handleCheckboxChange}
        />
      </VStack>
      <VStack align="flex-start" minWidth="740px">
        <Text textAlign="start" fontSize="xl" fontWeight="500" color={checked ? "#38A59F" : "#636A80"}>
          {convertDate}
        </Text>
        <HStack
          width="full"
          bg="#fff"
          minWidth="600px"
          height="fit-content"
          boxShadow="xl"
          padding="18px 20px"
          border="2px solid #ccc"
          borderColor={checked ? "#38A59F" : "#ccc"}
          borderRadius="8px"
        >
          <VStack alignSelf="flex-start">
            <Image
              borderRadius="8px"
              width="200px"
              src={`${tour?.tour?.thumbnail}`}
              alt="img"
            />
          </VStack>
          <VStack
            align="self-start"
            flex="1"
            paddingLeft="8px"
            fontSize="md"
            fontWeight="600"
          >
            <Link
              href={`/tour-detail/${tour.tour._id}`}
              _hover={{ textDecoration: "none" }}
            >
              <Text fontSize="xl" fontWeight="bold">
                {tour.tour.title}
              </Text>
            </Link>
            <HStack>
              <TfiTicket />
              <Text> Sunrise or Sunset Jeep Tour</Text>
            </HStack>
            <HStack>
              {!editTour ? (
                <>
                  <IoTimerOutline />
                  <Text>
                    {convertDate} {tour.startTime}
                  </Text>
                </>
              ) : (
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
                          {!selectedDate ? `${convertDate}` : `${showDate}`}
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
              )}
            </HStack>
            <HStack>
              {!editTour ? (
                <>
                  <MdPeopleAlt />
                  {tour.participants.map((participant) => (
                    <Text key={participant.title}>
                      {participant.quantity} {participant.title}
                    </Text>
                  ))}
                </>
              ) : (
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
                    {tourDetail.priceOptions.map((participant) => {
                      const foundParticipant = tour.participants.filter(p => p.title === participant.title);
                      const quantity = foundParticipant[0]?.quantity ?? 0
                      return (
                          <MenuItem
                              quantity={quantity}
                              key={participant._id}
                              type={participant.title}
                              price={participant.value}
                              setPrice={setPrice}
                              setType={setType}
                              setQuantity={setQuantity}
                          />
                      );
                  })}
                  </MenuList>
                </Menu>
              )}
            </HStack>
            <HStack>
              <FaRegCheckCircle />
              <Text>Free cancellation</Text>
            </HStack>
            <HStack width="full" justifyContent="space-between">
              <HStack>
                <Button borderRadius="full" onClick={handleEditTour}>
                  {!editTour ? (
                    <>
                      <GoPencil />
                      <Text>Edit</Text>
                    </>
                  ) : (
                    "Cancel"
                  )}
                </Button>
                <Button borderRadius="full" onClick={handleCommand}>
                  {!editTour ? (
                    <FaTrashAlt color="red" />
                  ) : (
                    <FaCheckSquare color="green" />
                  )}
                </Button>
              </HStack>
              <Text fontSize="xl" fontWeight="600">
                {formatCurrency(tourPrice)}
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default observer(CartItem);
