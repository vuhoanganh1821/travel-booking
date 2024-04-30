'use client'
import { useEffect, useState } from 'react'
import { Box, Button, Divider, FormControl, FormLabel, HStack, Radio, RadioGroup, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { ERole } from 'enums/user'
import { useStores } from 'hooks/useStores'
import { IUser } from 'interfaces/user'
import { observer } from 'mobx-react'
import { usePathname, useRouter } from 'next/navigation'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import routes from 'routes'
import FormLabelValue from '../../../../components/FormLabelValue'
import { EBookingStatus } from 'enums/booking'
import { PLATFORM } from 'enums/common'

interface IBookingDetailForm {
  status: EBookingStatus
}

const BookingDetail = () => {
  const { userStore } = useStores()
  const { userDetail } = userStore
  const router = useRouter()
  const pathname = usePathname()
  const userId = pathname?.split('/').pop() ?? ''
  const methods = useForm<IBookingDetailForm>()
  const { control, handleSubmit, reset, register, setValue } = methods
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const status = useWatch({ control, name: 'status' }) ?? EBookingStatus.NEW

  function backToBookingList() {
    router.push(routes.cms.bookingManagement.value)
  }

  async function onSubmit(data: IBookingDetailForm) {
    setIsLoading(true)
    try {
      toast.success('Update booking successfully')
    } catch (error) {
      setIsLoading(false)
      toast.error('Update booking failed')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      userStore.fetchUserDetail(userId, PLATFORM.WEBSITE)
    }
  }, [userId])

  useEffect(() => {
    if (userDetail?._id) {
      reset({})
    }
  }, [userDetail])

  return (
    <Box paddingX={{ base: 6, lg: 8 }} paddingY={6}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HStack width="full" justify="space-between" marginBottom={6}>
            <Text fontSize="lg" fontWeight={600}>
              Booking Information
            </Text>
            <HStack spacing={4}>
              <Button background="white" borderWidth={1} isLoading={isLoading} onClick={backToBookingList}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="teal" variant="solid" paddingX={4} isLoading={isLoading}>
                Save
              </Button>
            </HStack>
          </HStack>
          <HStack width="full" align="flex-start" spacing={8}>
            <Box width="full" background="white" padding={8} borderRadius={8} borderWidth={1} boxShadow="sm">
              <SimpleGrid maxWidth="1200px" columns={{ base: 1, md: 4 }} gap={4}>
                <FormLabelValue label="Phone Number" value="097 484 7385" />
                <FormLabelValue label="Booking Name" value="Vu Hoang Anh" />
                <FormLabelValue label="Email" value="vuhoanganh@yopmail.com" />
                <FormLabelValue label="Apply Date" value="04/04/2024" />
                <Divider borderWidth={1} gridColumn="span 4" />
                <FormLabelValue label="Tour Title" value="Khám phá Manchester United" />
                <FormLabelValue label="Move In Date" value="03/05/2024" />
                <FormLabelValue label="Tour Code" value="tour-03" />
                <FormLabelValue label="Address" value="097 484 7385" />
              </SimpleGrid>
            </Box>
            <VStack
              maxWidth={240}
              width="full"
              align="flex-start"
              background="white"
              padding={8}
              borderRadius={8}
              borderWidth={1}
              boxShadow="sm"
              spacing={6}
            >
              <FormControl id="status">
                <FormLabel color="gray.700" fontWeight={600} lineHeight={6} marginBottom={4}>
                  Booking Status
                </FormLabel>
                <RadioGroup value={status}>
                  <VStack align="flex-start">
                    <Radio colorScheme="teal" {...register('status')} value={EBookingStatus.NEW}>
                      New
                    </Radio>
                    <Radio colorScheme="teal" {...register('status')} value={EBookingStatus.PENDING}>
                      Pending
                    </Radio>
                    <Radio colorScheme="teal" {...register('status')} value={EBookingStatus.CONFIRMED}>
                      Confirmed
                    </Radio>
                    <Radio colorScheme="teal" {...register('status')} value={EBookingStatus.CANCELLED}>
                      Cancelled
                    </Radio>
                  </VStack>
                </RadioGroup>
              </FormControl>
            </VStack>
          </HStack>
        </form>
      </FormProvider>
    </Box>
  )
}

export default observer(BookingDetail)
