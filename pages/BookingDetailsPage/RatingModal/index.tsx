"use client";
import { useState, ChangeEvent } from 'react';
import { 
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, 
    Button, Textarea, VStack, HStack, IconButton, Text, Image 
} from '@chakra-ui/react';
import { IoIosStar } from 'react-icons/io';
import { ITour } from 'interfaces/tour';
import RatingStart from 'components/RatingStart';
import Title from 'components/Title';
import { useStores } from 'hooks';
import { ICreateReview } from 'interfaces/reviewTour';
import { PLATFORM } from 'enums/common';
import { toast } from 'react-toastify';

interface IRatingModal {
    tour?: ITour;
    isOpen: boolean;
    onClose: () => void;
}

const RatingModal = (props: IRatingModal) => {
    const { isOpen, onClose, tour = {} } = props;
    const {reviewStore} = useStores()
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');

    const handleRating = (rate: number) => setRating(rate);
    const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value);

    const handleSubmit = async() => {
        const data: ICreateReview = {
            user: localStorage.getItem(`${PLATFORM.WEBSITE}UserId`) ?? '',
            tour: tour._id ?? '',
            rating: rating,
            content: comment
        }
        await reviewStore.createReview(data)
        toast.success("Your feedback has been submitted! We appreciate your input and will use it to improve our services.");
        // console.log('Rating:', rating);
        // console.log('Comment:', comment);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxWidth="700px">
                <ModalHeader><Title text='Rate Your Experience'/> </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={6} align="flex-start">
                        <Text fontSize="lg" fontWeight="500">How was your experience?</Text>
                        <HStack align="flex-start" spacing={6} width="full">
                            <Image width={120} borderRadius="10px" src={tour.thumbnail} alt="tourimg" />
                            <VStack align="flex-start" spacing={2}>
                                <Text fontSize="lg" fontWeight="semibold">{tour.title}</Text>
                                <RatingStart ratingAverage={tour?.ratingAverage} numOfRating={tour?.numOfRating} />
                            </VStack>
                        </HStack>
                        <HStack spacing={1}>
                            {Array(5).fill('').map((_, i) => (
                                <IconButton
                                    key={i}
                                    icon={<IoIosStar size={30} />}
                                    color={i < rating ? 'yellow.400' : 'gray.300'}
                                    onClick={() => handleRating(i + 1)}
                                    variant="ghost"
                                    aria-label={`Rate ${i + 1} stars`}
                                    _hover={{ color: i < rating ? 'yellow.500' : 'gray.400' }}
                                    _focus={{ boxShadow: 'none' }}
                                />
                            ))}
                        </HStack>
                        <Textarea
                            placeholder="Leave a comment..."
                            value={comment}
                            onChange={handleCommentChange}
                            focusBorderColor="teal.400"
                            borderColor="gray.300"
                            _hover={{ borderColor: 'teal.400' }}
                        />
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default RatingModal;
