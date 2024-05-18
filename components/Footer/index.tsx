import {
  VStack,
  Box,
  HStack,
  Text,
  Link,
  IconButton,
  Image
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ width: "100%", backgroundColor: "#04364A", color: "#fff", paddingTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Box width="100%" padding="40px 20px" textAlign="center">
        <HStack spacing="24px" justifyContent="space-evenly">
          <VStack spacing={7} align='flex-start'> 
            <Text fontWeight="bold">About Us</Text>
            <Link>Press</Link>
            <Link>Careers</Link>
            <Link>Contact</Link>
          </VStack>
          <VStack spacing={7} align='flex-start'>
            <Text fontWeight="bold">Mobile</Text>
            <VStack spacing={7}>
              <Link href="https://play.google.com/store/apps/details?id=com.getyourguide.android&hl=en_US" isExternal>
                <img src="https://cdn.getyourguide.com/tf/assets/static/badges/google-play-badge-en-us.svg" alt="Google Play" width="170px" />  {/* Adjusted width */}
              </Link>
              <Link href="https://apps.apple.com/us/app/getyourguide-tours-activities/id657070903" isExternal>
                <img src="https://cdn.getyourguide.com/tf/assets/static/badges/app-store-badge-en-us.svg" alt="App Store" width="170px" />  {/* Adjusted width */}
              </Link>
            </VStack>
          </VStack>
          <VStack spacing={7} align='flex-start'>
            <HStack>
              <Text fontWeight="bold">Travel Life</Text>
              <Image width='70px' src="/assets/images/logo.jpg" alt="logo"/>
            </HStack>
            <Text fontSize="sm">Connect with Us:</Text>
            <HStack spacing="8px">
              <IconButton aria-label="Facebook" icon={<FaFacebook />} />
              <IconButton aria-label="Twitter" icon={<FaTwitter />} />
              <IconButton aria-label="Instagram" icon={<FaInstagram />} />
              <IconButton aria-label="LinkedIn" icon={<FaLinkedin />} />
            </HStack>
          </VStack>
         
        </HStack>
      </Box>
      <Box width="100%" padding="10px 20px" textAlign="center" backgroundColor="#01272B">
        <Text fontSize="sm">&copy; {new Date().getFullYear()} Travel Life. All rights reserved.</Text>
      </Box>
    </footer>
  );
};

export default Footer;
