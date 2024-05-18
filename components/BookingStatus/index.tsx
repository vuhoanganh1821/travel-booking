import { HStack, VStack, Text, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface IBookingStatus {
  currentPage: string;
}

const BookingStatus = (props: IBookingStatus) => {
  const { currentPage } = props;
  const [current, setCurrent] = useState(currentPage);

  const [color, setColor] = useState({
    "1": "#EB4909",
    "2a": "#EB4909",
    "2b": "#EB4909",
    "3": "#EB4909",
  });

  useEffect(() => {
    if (current === "booking") {
      setColor({
        "1": "#EB4909",
        "2a": "#ccc",
        "2b": "#ccc",
        "3": "#ccc",
      });
    } else if (current === "contact") {
      setColor({
        "1": "#EB4909",
        "2a": "#EB4909",
        "2b": "#ccc",
        "3": "#ccc",
      });
    }
  }, [current]);

  return (
    <HStack minWidth="602px" width="70%" justify="space-between">
      <VStack flex="1">
        <Box
          zIndex={1}
          _after={{
            position: "absolute",
            content: "''",
            maxWidth: "174px",
            minWidth: "100px",
            marginTop: "-14px",
            width: "full",
            height: "4px",
            bg: `${color["2a"]}`,
            zIndex: -1,
          }}
        >
          <Text
            borderRadius="full"
            padding="2px 10px"
            background={`${color["1"]}`}
            color="#fff"
            zIndex={1}
          >
            1
          </Text>
        </Box>

        <Text color={`${color["1"]}`}>Activity</Text>
      </VStack>
      <VStack flex="1">
        <Box
          zIndex={1}
          _before={{
            position: "absolute",
            content: "''",
            maxWidth: "140px",
            minWidth: "100px",
            marginLeft: "-120px",
            marginTop: "14px",
            width: "full",
            height: "4px",
            bg: `${color["2a"]}`,
            zIndex: -1,
          }}
          _after={{
            position: "absolute",
            content: "''",
            maxWidth: "174px",
            minWidth: "100px",
            marginTop: "-14px",
            width: "full",
            height: "4px",
            bg: `${color["2b"]}`,
            zIndex: -1,
          }}
        >
          <Text
            borderRadius="full"
            padding="2px 10px"
            background={`${color["2a"]}`}
            color="#fff"
            zIndex={1}
          >
            2
          </Text>
        </Box>
        <Text color={`${color["2a"]}`} >Contact</Text>
      </VStack>
      <VStack flex="1" width="full">
        <Box
          zIndex={1}
          _before={{
            position: "absolute",
            content: "''",
            maxWidth: "140px",
            minWidth: "100px",
            marginLeft: "-120px",
            marginTop: "14px",
            width: "full",
            height: "4px",
            bg: `${color["3"]}`,
            zIndex: -1,
          }}
        >
          <Text
            borderRadius="full"
            padding="2px 10px"
            background={`${color["3"]}`}
            color="#fff"
            zIndex={1}
          >
            3
          </Text>
        </Box>
        <Text color={`${color["3"]}`} >Payment</Text>
      </VStack>
    </HStack>
  );
};

export default BookingStatus;
