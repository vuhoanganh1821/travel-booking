import { HStack, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import routes from "routes";

interface ISearchItem {
  _id?: string
  imgsrc?: string
  title?: string
  type?: string
}

const SearchItem = (props: ISearchItem) => {
  const { imgsrc, title, type, _id=''} = props;
  const route = useRouter()

  function handleClick() {
    if(type === 'city'){
      route.push(routes.listtour.value(_id))
    }else {
      route.push(routes.detail.value(_id))
    }
      
  }

  return (  
    <HStack
      height="65px"
      width="full"
      padding="8px"
      alignSelf="flex-start"
      fontSize="md"
      alignItems="center"
      borderRadius="8px"
      onClick={handleClick}
      _hover={{
        background: "#ebeef1",
      }}
    >
      <Image
        width="50px"
        height="50px"
        objectFit="cover"
        borderRadius="8px"
        src={imgsrc}
        alt="img"
      />
      <Text userSelect="none" fontWeight="700">{title}</Text>
    </HStack>
  );
};

export default SearchItem;
