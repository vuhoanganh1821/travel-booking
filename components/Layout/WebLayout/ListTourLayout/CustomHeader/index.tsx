import { Box, HStack, Img, Link, Menu, MenuButton, MenuList, StackProps, VStack, Text } from "@chakra-ui/react";
import Actions from "../../components/Actions";
import SearchBarInput from "../../components/SearchBarInput";
import logo from "../../../../public/assets/images/logo.jpg";
import MenuItem from "../../components/MenuItem";
import { LuCalendarDays } from "react-icons/lu";
import { TriangleDownIcon } from "@chakra-ui/icons";
import CustomCalendar from "../../components/Calendar";
import { useEffect, useState } from "react";

interface IHeader extends StackProps {
  openLoginModal: () => void;
  background?: string;
  bgGradient?: string;
  color?: string;
  underLineHoverColor?: string;
  hoverColor?: string;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


const CustomHeader = (props: IHeader) => {
  const {
    openLoginModal,
    background,
    bgGradient,
    color,
    underLineHoverColor,
    hoverColor,
    ...rest
  } = props;
  const [selectedDate, setSelectedDate] = useState<Value>(null);
  const [showDate, setShowDate] = useState<string[]>([]);
  const [isMenuDatePick, setIsMenuDatePick] = useState<boolean>(true);
  const [convertedDate, setConvertedDate] = useState<string>("");
  

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

  return (
    <VStack 
        width="full" bg='#fff' 
        paddingBottom={10}  
    >
        <VStack 
            maxWidth="1300px"
            width='full'
            height="full"
        >
            <HStack
                width="full"
                height="100px"
                justify='space-between'
                paddingTop="10px"
                {...(bgGradient
                ? { bgGradient: `${bgGradient}` }
                : { background: `${background}` })}
                {...rest}
            >

                <Link href="/">
                    <Img
                        src="/assets/images/logo.jpg"
                        width="110px"
                        cursor="pointer"
                    />
                </Link>
                <Actions
                    openLoginModal={openLoginModal}
                    color={color}
                    hoverColor={hoverColor}
                    underLineHoverColor={underLineHoverColor}
                />
            </HStack>
            <HStack width='full' justify='space-between'>
                <Box width='full' flex={2}> 
                    <SearchBarInput placeholder="Search tours by name" minHeight="70px"/>
                </Box>

                <Box flex={1}>
                    <Menu
                        autoSelect={false}
                        computePositionOnMount
                        placement="bottom-start"
                    >
                        <MenuButton
                        width="full"
                        height="70px"
                        background="#fff"
                        border="2px solid #dcdfe4"
                        borderRadius="999px"
                        padding="8px 12px"
                        fontWeight="bold"
                        >
                        <HStack justifyContent="space-between">
                            <HStack fontSize="xl" alignItems="center">
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
            </HStack>
        </VStack>
    </VStack>

  );
};

export default CustomHeader;
