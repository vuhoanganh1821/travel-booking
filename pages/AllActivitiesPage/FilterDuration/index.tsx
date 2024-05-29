import { Box, RadioGroup, Radio, FormControl, FormLabel, Stack, Text, HStack, MenuButton, Menu, MenuList } from "@chakra-ui/react"
import { TriangleDownIcon } from "@chakra-ui/icons"
import { useState } from "react";
import { IApplyFilter } from "..";
import CustomMenuButton from "../CustomMenuButton";

interface WorkHours {
    hours: number | null;
    days: number | null;
  }

interface IFilterDuration {
    setFliterOptions: React.Dispatch<React.SetStateAction<IApplyFilter>>
    isAppliedfilter?: boolean
}

const FilterDuration = (props: IFilterDuration) => {
    const {setFliterOptions, isAppliedfilter = false} = props

    const handleChange = (value: string) => {
        const numericValue = parseFloat(value)
        setFliterOptions((prevOptions) => ({
            ...prevOptions,
            duration: numericValue
        }))
    }
  
    return (
    <Box flex={1}>
        <Menu
            autoSelect={false}
            computePositionOnMount
            placement="bottom-start"
        >
            <CustomMenuButton 
                text='Duration'
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
                <FormControl as="fieldset" borderColor="gray.300" p={6} rounded="md">
                    <RadioGroup
                        colorScheme="teal"
                        onChange={handleChange}  
                    >
                    <Stack spacing={4}>
                        <Radio value="3">0-3 hours</Radio>
                        <Radio value="5">3-5 hours</Radio>
                        <Radio value="7">5-7 hours</Radio>
                    </Stack>
                    </RadioGroup>
                </FormControl>
               
            </MenuList>
        </Menu>
    </Box>
    )
}

export default FilterDuration