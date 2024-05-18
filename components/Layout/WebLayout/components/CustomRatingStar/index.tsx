import { Box } from '@chakra-ui/react';
import { IoIosStarOutline, IoIosStar } from 'react-icons/io';

interface ICustomRatingStar{
    size: number
    filling: number
}

export const CustomRatingStar = (props: ICustomRatingStar) => {
  const { filling, size } = props;
  const width = filling * 100 + '%';
  return (
    <Box position="relative" display="inline-block" width="24px" height="24px">
      <Box position="absolute" top="0" left="0" width="100%" height="100%">
        <IoIosStarOutline size={size} color='#f1e100'/>
      </Box>
      <Box position="absolute" top="0" left="0" width={width} height="100%" overflow="hidden">
        <IoIosStar size={size} color='#f1e100'/>
      </Box>
    </Box>
  );
};
