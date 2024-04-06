'use client'
import { useEffect, useState } from 'react'
import { Box, Button, HStack, Img, SimpleGrid, Text } from '@chakra-ui/react'
import { updateTourDetail } from 'API/tour'
import FormInput from 'components/FormInput'
import { useStores } from 'hooks/useStores'
import { ITour } from 'interfaces/tour'
import { observer } from 'mobx-react'
import { usePathname, useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import routes from 'routes'

interface IUpdateTourForm extends ITour {}

const UpdateTourDetail = () => {
  const { tourStore } = useStores()
  const { tourDetail } = tourStore
  const router = useRouter()
  const pathname = usePathname()
  const tourId = pathname?.split('/').pop() ?? ''
  const methods = useForm<IUpdateTourForm>()
  const { handleSubmit, reset } = methods
  const [isLoading, setIsLoading] = useState(false)

  function backToTourList() {
    router.push(routes.cms.tourManagement.value)
  }

  async function onSubmit(data: IUpdateTourForm) {
    setIsLoading(true)
    const priceOptions = [
      { title: 'Adult', value: 200000, currency: 'VND' },
      { title: 'Child', value: 100000, currency: 'VND' },
      { title: 'Infant', value: 50000, currency: 'VND' }
    ]
    try {
      await updateTourDetail(tourId, { ...data, priceOptions })
      await tourStore.fetchTourDetail(tourId)
      toast.success('Update tour detail successfully')
    } catch (error) {
      setIsLoading(false)
      toast.error('Update tour detail failed')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (tourId) {
      tourStore.fetchTourDetail(tourId)
    }
  }, [tourId])

  useEffect(() => {
    if (tourDetail?._id) {
      reset({ title: tourDetail.title, code: tourDetail.code })
    }
  }, [tourDetail])

  return (
    <Box paddingX={{ base: 6, lg: 8 }} paddingY={6}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HStack width="full" justify="space-between" marginBottom={6}>
            <Text fontSize="lg" fontWeight={600}>
              Update Tour Detail
            </Text>
            <HStack spacing={4}>
              <Button background="white" borderWidth={1} isLoading={isLoading} onClick={backToTourList}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="teal" variant="solid" paddingX={4} isLoading={isLoading}>
                Save
              </Button>
            </HStack>
          </HStack>
          <Box background="white" padding={8} borderRadius={8} borderWidth={1} boxShadow="sm">
            <SimpleGrid maxWidth="1200px" columns={{ base: 1, md: 3 }} gap={6}>
              <FormInput name="code" label="Code" />
              <FormInput name="title" label="Title" />
              <Img src={tourDetail?.thumbnail} borderRadius={8} />
            </SimpleGrid>
          </Box>
        </form>
      </FormProvider>
    </Box>
  )
}

export default observer(UpdateTourDetail)
