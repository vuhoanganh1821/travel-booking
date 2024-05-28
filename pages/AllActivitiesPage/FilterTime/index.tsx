import { Box, HStack, Menu, MenuButton, MenuList, Text, RadioGroup, Stack, Radio } from "@chakra-ui/react"
import { TriangleDownIcon } from "@chakra-ui/icons"
import { IApplyFilter } from ".."


interface IFilterTime {
    setFliterOptions: React.Dispatch<React.SetStateAction<IApplyFilter>>
}

const FilterTime = (props: IFilterTime) => {
    const {setFliterOptions} = props

    function handleChange(value: string) {
        const numericValue = parseFloat(value)
        setFliterOptions((prevOptions) => ({
            ...prevOptions,
            time: numericValue
        }))
    }

    return (
    <Box flex={1}>
        <Menu
            autoSelect={false}
            computePositionOnMount
            placement="bottom-start"
        >
            <MenuButton
            width="full"
            height="50px"
            background="#fff"
            border="2px solid #dcdfe4"
            borderRadius="10px"
            padding="8px 12px"
            fontWeight="bold"
            >
            <HStack justifyContent="space-between">
                <Text>Time</Text>
                <TriangleDownIcon />
            </HStack>
            </MenuButton>

            <MenuList>
                <RadioGroup 
                    as="fieldset" 
                    borderColor="gray.300" 
                    padding={6} 
                    rounded="md" 
                    colorScheme="teal" 
                    onChange={handleChange}
                >
                    <Stack spacing={4}>
                    <Radio value="7">In the morning, 8 AM-12 PM</Radio>
                    <Radio value="3">In the afternoon, 12 PM-5 PM</Radio>
                    <Radio value="8">In the evening, 5 PM-12 AM</Radio>
                    </Stack>
                </RadioGroup>
            </MenuList>
        </Menu>
    </Box>
    )
}

export default FilterTime