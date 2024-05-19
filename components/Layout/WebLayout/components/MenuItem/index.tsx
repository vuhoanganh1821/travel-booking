import { useState, useEffect } from "react";
import { HStack, VStack, Text, Button } from "@chakra-ui/react";
import { LuMinusCircle, LuPlusCircle } from "react-icons/lu";
import { formatCurrency } from "utils/common";

interface IMenuItem {
  quantity?: number;
  type: string;
  price: number;
  setType: React.Dispatch<React.SetStateAction<string>>;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
}

const MenuItem = (props: IMenuItem) => {
  const { quantity = 0, type, price, setType, setQuantity, setPrice } = props;
  const [count, setCount] = useState(quantity);
  const [start, setStart] = useState<boolean>(true);
  function increaseQuantityHandler() {
    setCount(count + 1);
    setStart(false);
  }
  function decreaseQuantityHandler() {
    setCount(count - 1);
    setStart(false);
  }
  useEffect(() => {
    if (!start) {
      setType(type);
      setQuantity(count);
      setPrice(price);
    } else {
      setStart(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <HStack
      justifyContent="space-between"
      padding="4px 8px"
      borderBottom="1px solid "
      margin="2px 8px"
    >
      <VStack align="flex-start" fontWeight="bold">
        <Text>{type}</Text>
        <Text>price: {formatCurrency(price)}</Text>
      </VStack>
      <HStack spacing={2} fontSize="xl">
        <Button
          background="transparent"
          {...(count <= 0
            ? {
                cursor: "not-allowed",
                onClick: () => {},
                color: "#ccc",
                _hover: { background: "transparent" },
              }
            : {
                cursor: "pointer",
                color: "teal.300",
                onClick: decreaseQuantityHandler,
              })}
        >
          <LuMinusCircle size="1.5rem" />
        </Button>
        <Text
          width="32px"
          height="32px"
          textAlign="center"
          border="1px solid rgba(26, 43, 73, 0.2)"
          borderRadius="3px"
        >
          {count}
        </Text>
        <Button
          color="teal.300"
          background="transparent"
          onClick={increaseQuantityHandler}
        >
          <LuPlusCircle size="1.5rem" />
        </Button>
      </HStack>
    </HStack>
  );
};

export default MenuItem;