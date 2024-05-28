import { Box, HStack, Menu, MenuButton, MenuList, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { IApplyFilter } from "..";

interface IFilterStar {
    setFliterOptions: React.Dispatch<React.SetStateAction<IApplyFilter>>
}

const FilterStar = (props: IFilterStar) => {
    const { setFliterOptions } = props;

    const handleChange = (value: string) => {
        const numericValue = parseFloat(value);
        setFliterOptions(prevOptions => ({
            ...prevOptions,
            star: numericValue
        }));
    };

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
                        <Text>Star</Text>
                        <TriangleDownIcon />
                    </HStack>
                </MenuButton>

                <MenuList>
                    <RadioGroup
                        as="fieldset"
                        borderColor="gray.300"
                        p={6}
                        rounded="md"
                        colorScheme="teal"
                        onChange={handleChange}
                    >
                        <Stack spacing={4}>
                            <Radio value="3">3.0+</Radio>
                            <Radio value="3.5">3.5+</Radio>
                            <Radio value="4">4.0+</Radio>
                            <Radio value="4.5">4.5+</Radio>
                        </Stack>
                    </RadioGroup>
                </MenuList>
            </Menu>
        </Box>
    );
};

export default FilterStar;
