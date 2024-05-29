"use client"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Divider,
    HStack,
    SimpleGrid,
    VStack,
    Button,
    FormControl,
    FormLabel,
    Input,
    Radio,
    RadioGroup,
    Stack,
  } from '@chakra-ui/react'
import { RxCross2 } from "react-icons/rx";
import Title from 'components/Title'
import { useForm } from 'react-hook-form';
import { IApplyFilter } from '..';
import { useEffect, useState } from 'react';

interface IFilterModal {
    isOpen: boolean
    onClose: () => void
    filterOptions: IApplyFilter
    setFliterOptions: React.Dispatch<React.SetStateAction<IApplyFilter>>
}

const FilterModal = (props: IFilterModal) => {
    const {isOpen, onClose, setFliterOptions, filterOptions} = props
    const { handleSubmit, register, reset, formState: { errors, isSubmitting } } = useForm<IApplyFilter>();
    const [filterValue, setFilterValue] = useState<IApplyFilter>(filterOptions)

    useEffect(() => {
        reset({
            priceMax: filterOptions.priceMax,
            priceMin: filterOptions.priceMin
        })
    }, [filterValue.priceMax, filterValue.priceMin])

    useEffect(() => {
        setFilterValue(filterOptions)
    }, [filterOptions])

    const handleChangeStar = (value: string) => {
        const numericValue = parseFloat(value);
        setFliterOptions(prevOptions => ({
            ...prevOptions,
            star: numericValue
        }));
    };
    const handleChangeDuration = (value: string) => {
        const numericValue = parseFloat(value)
        setFliterOptions((prevOptions) => ({
            ...prevOptions,
            duration: numericValue
        }))
    }

    const onSubmit = (data: IApplyFilter) => {
        setFliterOptions((prevOptions) => ({
            ...prevOptions,
            priceMin: data.priceMin,
            priceMax: data.priceMax
        }));
    }

    const resetAllFilter = () => {
        setFliterOptions({} as IApplyFilter)
    }

    return(     
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent maxWidth={700}>
                <ModalHeader><Title text='Filters'/></ModalHeader>
                <ModalCloseButton/>
                <ModalBody fontWeight='500'>
                    {/* <Text>Applied filters</Text>
                    <HStack wrap="wrap" spacing={1}>
                        <HStack padding={2} background='#f5f5f5' width='fit-content' border='2px solid #888' borderRadius={10}>
                            <Text>meo meo meo meo</Text>
                            <RxCross2 />
                        </HStack>
                        <HStack padding={2} background='#f5f5f5' width='fit-content' border='2px solid #888' borderRadius={10}>
                            <Text>meo meo</Text>
                            <RxCross2 />
                        </HStack>
                        <HStack padding={2} background='#f5f5f5' width='fit-content' border='2px solid #888' borderRadius={10}>
                            <Text>meo meo meo</Text>
                            <RxCross2 />
                        </HStack>
                        <HStack padding={2} background='#f5f5f5' width='fit-content' border='2px solid #888' borderRadius={10}>
                            <Text>meo meo meo meo</Text>
                            <RxCross2 />
                        </HStack>
                        <HStack padding={2} background='#f5f5f5' width='fit-content' border='2px solid #888' borderRadius={10}>
                            <Text>meo meo meo meo</Text>
                            <RxCross2 />
                        </HStack>
                    </HStack> */}
                    <Divider/>
                    <Text>Price</Text>
                        <HStack width='full' justifyContent='space-evenly' margin={4}>
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
                        </HStack>
                    <Divider/>
                    <Text>Duration</Text>
                        <RadioGroup
                            colorScheme="teal"
                            as="fieldset" 
                            borderColor="gray.300" 
                            p={6} 
                            rounded="md"
                            onChange={handleChangeDuration}
                            {...(filterValue.duration && {defaultValue: `${filterValue.duration}`})}
                        >
                        <Stack spacing={4}>
                            <Radio value="3">0-3 hours</Radio>
                            <Radio value="5">3-5 hours</Radio>
                            <Radio value="7">5-7 hours</Radio>
                        </Stack>
                        </RadioGroup>
                    <Divider/>
                    <Text>Star</Text>
                        <RadioGroup
                            as="fieldset"
                            borderColor="gray.300"
                            p={6}
                            rounded="md"
                            colorScheme="teal"
                            onChange={handleChangeStar}
                            {...(filterValue.star && {defaultValue: `${filterValue.star}`})}
                        >
                            <Stack spacing={4}>
                                <Radio value="3">3.0+</Radio>
                                <Radio value="3.5">3.5+</Radio>
                                <Radio value="4">4.0+</Radio>
                                <Radio value="4.5">4.5+</Radio>
                            </Stack>
                        </RadioGroup>
                    <Divider/>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='teal' onClick={resetAllFilter}>Reset</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default FilterModal