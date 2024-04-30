import { HStack, Img, Link, StackProps } from "@chakra-ui/react";
import Action from "./Actions";
import SearchBarInput from "./SearchBarInput";
import logo from "../../../../public/assets/images/logo.jpg";

interface IHeader extends StackProps {
  openLoginModal: () => void;
  background?: string;
  bgGradient?: string;
  color?: string;
  underLineHoverColor?: string;
  hoverColor?: string;
}

const Header = (props: IHeader) => {
  const {
    openLoginModal,
    background,
    bgGradient,
    color,
    underLineHoverColor,
    hoverColor,
    ...rest
  } = props;
  return (
    <HStack
      width="full"
      height="80px"
      paddingX={8}
      paddingTop="10px"
      {...(bgGradient
        ? { bgGradient: `${bgGradient}` }
        : { background: `${background}` })}
      {...rest}
    >
      <HStack
        margin="0px 253px"
        justifyContent="space-between"
        height="100%"
        width="73.4%"
      >
        <HStack spacing={10}>
          <Link href="/">
            <Img
              src="/assets/images/logo.jpg"
              boxSize="50px"
              cursor="pointer"
            />
          </Link>
          <SearchBarInput placeholder="Search tours by name" />
        </HStack>
        <Action
          openLoginModal={openLoginModal}
          color={color}
          hoverColor={hoverColor}
          underLineHoverColor={underLineHoverColor}
        />
      </HStack>
    </HStack>
  );
};

export default Header;
