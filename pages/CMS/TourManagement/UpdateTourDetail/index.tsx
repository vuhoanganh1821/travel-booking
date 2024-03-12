'use client'
import { Box, Button, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import FormInput from 'components/FormInput'
import { useStores } from 'hooks/useStores'
import { ITour } from 'interfaces/tour'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

interface IUpdateTourForm extends ITour {}

const UpdateTourDetail = () => {
  const { tourStore } = useStores()
  const methods = useForm<IUpdateTourForm>()
  const { handleSubmit, reset } = methods

  async function onSubmit(data: IUpdateTourForm) {}

  useEffect(() => {

  }, [])

  return (
    <Box paddingX={{ base: 6, lg: 8 }} paddingY={6}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HStack width="full" justify="space-between" marginBottom={6}>
            <Text fontSize="lg" fontWeight={600}>
              Update Tour Detail
            </Text>
            <HStack spacing={4}>
              <Button background="white" borderWidth={1}>
                Cancel
              </Button>
              <Button colorScheme="teal" variant="solid" paddingX={4}>
                Save
              </Button>
            </HStack>
          </HStack>
          <Box background="white" padding={8} borderRadius={8} borderWidth={1} boxShadow="sm">
            <SimpleGrid maxWidth="1200px" columns={{ base: 1, md: 2 }} gap={6}>
              <FormInput name="code" label="Code" />
              <FormInput name="title" label="Title" />
            </SimpleGrid>
          </Box>
        </form>
      </FormProvider>
    </Box>
  )
}

export default UpdateTourDetail
