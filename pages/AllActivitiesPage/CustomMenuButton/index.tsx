import { TriangleDownIcon } from "@chakra-ui/icons"
import { Box, HStack, MenuButton, MenuButtonProps, StackProps, Text } from "@chakra-ui/react"

interface ICustomMenuButton extends MenuButtonProps {
    text: string
    icon?: string
}

const CustomMenuButton = (props: ICustomMenuButton) => {
    const { text, ...rest } = props
    return(
        <Box  
        position='relative'
        width="full"
        height="50px">
            <MenuButton
                width="full"
                height='full'
                background="#fff"
                border="2px solid #dcdfe4"
                borderRadius="10px"
                padding="8px 12px"
                fontWeight="bold"
                {...rest}
            >
                <HStack justifyContent="space-between">
                    <Text>{text}</Text>
                    <TriangleDownIcon />
                </HStack>
            </MenuButton>
        </Box>
        
    )
}

export default CustomMenuButton