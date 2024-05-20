import { Link, VStack, Text } from "@chakra-ui/react";
import {toast} from 'react-toastify'
import { PLATFORM } from "enums/common";
import { color } from "framer-motion";
import { ReactNode } from "react";

interface IActionItemProps {
  actionIcon: ReactNode
  title: string
  to: () => void
  color?: string
  underLineHoverColor?: string
  hoverColor?: string
}



const ActionItem = (props: IActionItemProps) => {
  const { actionIcon, title, to, color, underLineHoverColor, hoverColor } = props

  function handleIsLogin() {
    const userId = localStorage.getItem(`${PLATFORM.WEBSITE}UserId`)
    if(userId){
      to()
    }else{
      toast.warn("Please login first")
      return
    }
  }

  return (
    <VStack
      fontSize="md"
      {...(color ? { color: `${color}` } : { color: "#fff" })}
      margin="0px 16px"
      lineHeight="8px"
      _after={{
        content: '""',
        backgroundColor: "#transparent",
        mt: "4px",
        height: "2px",
        width: "0px",
        transition: "width .1s ease-in",
      }}
      _hover={{
        "&::after": {
          width: "100%",
          backgroundColor: underLineHoverColor ? underLineHoverColor : "#fff",
        },
        color: hoverColor ? hoverColor : "#fff",
      }}
      onClick={handleIsLogin}
    >
      <Text userSelect="none" fontSize="2xl">{actionIcon}</Text>
      <Text userSelect="none">{title}</Text>
    </VStack>
  )
}

export default ActionItem
