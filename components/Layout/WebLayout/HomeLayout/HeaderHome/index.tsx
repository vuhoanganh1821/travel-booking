import { Img, HStack, Box, VStack, Text, Link, Menu } from "@chakra-ui/react";
import Header from "components/Layout/WebLayout/components/Header";
import { GoChevronRight } from "react-icons/go";

interface IHeaderProps {
  openLoginModal: () => void;
  openSignUpModal: () => void;
}

const HeaderHome = (props: IHeaderProps) => {
  const { openLoginModal, openSignUpModal } = props;
  return (
    <Box
      width="full"
      boxShadow="md"
      background={`linear-gradient(268deg, rgba(12, 24, 47, 0) 34.23%, rgba(12, 24, 47, .6) 97.86%), url('assets/images/homeimg.jpg') no-repeat center/cover`}
      backgroundPosition="center"
      bgRepeat="no-repeat"
      height="603px"
    >
      <Header
        openLoginModal={openLoginModal}
        bgGradient="linear(to-b, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))"
      />
      <Box
        width='full'
        display='flex'
        justifyContent="center"
        alignItems="center"
      >
        <VStack
          textAlign="start"
          color="#fff"
          margin="70px 0px"
          maxWidth='1300px'
          width='full'
        >
          <Text
            width="50%"
            fontSize="6xl"
            fontWeight="900"
            alignSelf="flex-start"
            mb="28px"
          >
            Make memories on your next trip
          </Text>
          <Text
            width="40%"
            fontSize="2xl"
            fontWeight="700"
            alignSelf="flex-start"
            mb="18px"
          >
            Join us for the ultimate travel adventure and unforgettable
            experiences
          </Text>
          <Link width="40%" fontSize="md" alignSelf="flex-start">
            <HStack>
              <Text>Learn more</Text>
              <GoChevronRight fontSize="1.8rem" fontWeight="600" />
            </HStack>
          </Link>
        </VStack>
      </Box>
    </Box>
  );
};

export default HeaderHome;
