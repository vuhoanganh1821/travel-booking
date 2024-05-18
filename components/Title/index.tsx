import React from "react"
import { Text, TextProps } from "@chakra-ui/react"

interface ITitle extends TextProps {
    text: string
}

const Title = (props: ITitle) => {
    const {text, ...rest} = props
    return( 
    <Text
    fontSize="2xl"
    color="#007f7b"
    paddingLeft="20px"
    fontWeight="bold"
    _before={{
        position: "absolute",
        marginLeft: "-20px",
        borderRadius: "2px",
        content: "''",
        width: "10px",
        height: "30px",
        bg: "#007f7b",
    }}
    {...rest}
      >
        {text}
      </Text>)
}

export default Title