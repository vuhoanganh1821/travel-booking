'use client'
import { useEffect, useState } from 'react'
import { Box, HStack, Tag, TagLabel, Text } from '@chakra-ui/react'
import { approveReview, deleteReview } from 'API/review'
import ConfirmModal from 'components/ConfirmModal'
import Icon from 'components/Icon'
import Table from 'components/Table'
import { useStores } from 'hooks/useStores'
import { IReview } from 'interfaces/review'
import get from 'lodash/get'
import { observer } from 'mobx-react'
import { getValidArray } from 'utils/common'
import { getHeaderList } from './utils'
import { toast } from 'react-toastify'

const ReviewManagement = () => {
  const { reviewStore } = useStores()
  const { reviews } = reviewStore
  const pageIndex: number = 1
  const [pageSize, setPageSize] = useState<number>(10)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [isApproving, setIsApproving] = useState<boolean>(false)
  const [selectedReviewId, setSelectedReviewId] = useState<string>()

  const pagination = { pageIndex, tableLength: 10, gotoPage }

  const dataInTable = getValidArray(reviews).map(review => {
    function onClickApproveReview(): void {
      setSelectedReviewId(review?._id)
      setIsApproving(true)
    }

    function onClickDeleteReview(): void {
      setSelectedReviewId(review?._id)
      setIsDeleting(true)
    }

    return {
      ...review,
      tour: get(review?.tour, 'code', ''),
      user: get(review?.user, 'fullname', ''),
      status: review?.approve ? (
        <Tag variant="outline" colorScheme="green" backgroundColor="green.50">
          <TagLabel>Approved</TagLabel>
        </Tag>
      ) : (
        <Tag variant="outline" colorScheme="blue" backgroundColor="blue.50">
          <TagLabel>New</TagLabel>
        </Tag>
      ),
      actions: (
        <HStack width="86px" justify="flex-end" cursor="pointer" marginLeft="auto">
          {!review?.approve && (
            <Icon iconName="edit.svg" size={32} onClick={onClickApproveReview} />
          )}
          <Icon iconName="trash.svg" size={32} onClick={onClickDeleteReview} />
        </HStack>
      )
    }
  })

  function gotoPage(page: number): void {}

  async function handleApproveReview(): Promise<void> {
    try {
      if (selectedReviewId) {
        await approveReview(selectedReviewId)
        await reviewStore.fetchAllReviewsByAdmin()
        setIsApproving(false)
        toast.success('Approve review successfully')
      }
    } catch (error) {
      setIsApproving(false)
      toast.error('Approve review failed')
    }
  }

  async function handleDeleteReview(): Promise<void> {
    try {
      if (selectedReviewId) {
        await deleteReview(selectedReviewId)
        await reviewStore.fetchAllReviewsByAdmin()
        setIsDeleting(false)
        toast.success('Delete review successfully')
      }
    } catch (error) {
      setIsDeleting(false)
      toast.error('Delete review failed')
    }
  }

  useEffect(() => {
    reviewStore.fetchAllReviewsByAdmin()
  }, [])

  return (
    <Box paddingX={{ base: 6, lg: 8 }} paddingY={6}>
      <Table
        headerList={getHeaderList()}
        tableData={dataInTable}
        pagination={pagination}
        pageSize={pageSize}
        setPageSize={setPageSize}
        isManualSort
      />
      <ConfirmModal
        titleText="Approve Review"
        bodyText={<Text>Are you sure to approve this review?{<br />}This action can not be undo</Text>}
        cancelButtonText="Cancel"
        confirmButtonText="Approve"
        isOpen={isApproving}
        onClose={() => setIsApproving(false)}
        onClickAccept={handleApproveReview}
      />
      <ConfirmModal
        titleText="Delete Review"
        bodyText={<Text>Are you sure to delete this review?{<br />}This action can not be undo</Text>}
        cancelButtonText="No, keep this review"
        confirmButtonText="Yes, delete"
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onClickAccept={handleDeleteReview}
      />
    </Box>
  )
}

export default observer(ReviewManagement)
