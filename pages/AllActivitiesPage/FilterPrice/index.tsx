import { Box, HStack, Menu, MenuButton, MenuList, Text, FormControl, FormLabel, Input, Button } from "@chakra-ui/react"
import { TriangleDownIcon } from "@chakra-ui/icons"
import { useForm } from "react-hook-form";
import { IApplyFilter } from "..";

interface IFilterPrice {
    setFliterOptions: React.Dispatch<React.SetStateAction<IApplyFilter>>
}

const FilterPrice = (props: IFilterPrice) => {
    const { setFliterOptions } = props;
    const { handleSubmit, register, reset, formState: { errors, isSubmitting } } = useForm<IApplyFilter>();

    const onSubmit = (data: IApplyFilter) => {
        setFliterOptions((prevOptions) => ({
            ...prevOptions,
            priceMin: data.priceMin,
            priceMax: data.priceMax
        }));
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
                        <Text>Price</Text>
                        <TriangleDownIcon />
                    </HStack>
                </MenuButton>

                <MenuList padding="12px 18px">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <HStack width='full' justifyContent='space-evenly'>
                            <FormControl>
                                <FormLabel htmlFor='priceMin'>Min Price</FormLabel>
                                <Input
                                    fontSize='xl'
                                    height='60px'
                                    id='priceMin'
                                    type='number'
                                    placeholder='Enter Minimum Price'
                                    {...register('priceMin', {
                                        required: 'This is required',
                                    })}
                                />
                                {errors.priceMin && <Text color="red">{errors.priceMin.message}</Text>}
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='priceMax'>Max Price</FormLabel>
                                <Input
                                    fontSize='xl'
                                    height='60px'
                                    id='priceMax'
                                    type='number'
                                    placeholder='Enter Maximum Price'
                                    {...register('priceMax', {
                                        required: 'This is required',
                                    })}
                                />
                                {errors.priceMax && <Text color="red">{errors.priceMax.message}</Text>}
                            </FormControl>
                        </HStack>
                        <Button type='submit' width='full' marginTop={6} colorScheme="teal" isLoading={isSubmitting}>
                            Apply
                        </Button>
                    </form>
                </MenuList>
            </Menu>
        </Box>
    );
};

export default FilterPrice;
