import {
  VStack,
  Box,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        bottom: "0",
        position: "relative",
        marginTop: "48px",
      }}
    >
      <Box
        fontSize="1.4rem"
        fontWeight="bold"
        width="full"
        height="200px"
        bg="#04364A"
        color="#fff"
      >
        <HStack margin="0px 51px" padding="0px 96px">
          <HStack>
            <Text></Text>
            <Menu>
              <MenuButton>
                <HStack></HStack>
              </MenuButton>
              <MenuList>
                <MenuItem></MenuItem>
              </MenuList>
            </Menu>
          </HStack>
          <Box></Box>
          <Box></Box>
          <Box></Box>
          <Box></Box>
        </HStack>
        <HStack>meomeomeo</HStack>
      </Box>
    </footer>
  );
};

export default Footer;
