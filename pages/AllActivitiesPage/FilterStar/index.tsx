import { Box, HStack, Menu, MenuButton, MenuList, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { IApplyFilter } from "..";
import CustomMenuButton from "../CustomMenuButton";

interface IFilterStar {
    setFliterOptions: React.Dispatch<React.SetStateAction<IApplyFilter>>
    isAppliedfilter?: boolean
}

const FilterStar = (props: IFilterStar) => {
    const { setFliterOptions, isAppliedfilter = false } = props;

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
               <CustomMenuButton 
                    text='Star'
                    {...(isAppliedfilter && {
                        _after: {
                        position: 'absolute',
                        content: '"1"',
                        top: '0',
                        right: '0',
                        fontSize: 'xs',
                        background: 'teal',
                        width: '20px',
                        borderRadius: '6px',
                        color: '#fff'},
                        
                        borderColor: 'teal'
                    })} 
                />

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
