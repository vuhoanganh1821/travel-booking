import { HStack, Image, Text } from "@chakra-ui/react";

interface ISearchItem {
  imgsrc?: string;
  title?: string;
}

const SearchItem = (props: ISearchItem) => {
  const { imgsrc, title } = props;
  return (
    <HStack
      height="58px"
      width="485px"
      padding="8px"
      alignSelf="flex-start"
      fontSize="md"
      alignItems="center"
      borderRadius="8px"
      _hover={{
        background: "#ebeef1",
      }}
    >
      <Image
        width="42px"
        height="42px"
        objectFit="cover"
        borderRadius="8px"
        src={imgsrc}
        alt="img"
      />
      <Text fontWeight="700">{title}</Text>
    </HStack>
  );
};

export default SearchItem;
