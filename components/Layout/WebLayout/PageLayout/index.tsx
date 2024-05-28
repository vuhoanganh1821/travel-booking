"use client";
import { useState } from "react";
import { Box, VStack } from "@chakra-ui/react";
import Header from "../components/Header";
import LoginModal from "../components/LoginModal";
import Footer from "components/Footer";
import SignUpModal from "../components/SignUpModal";
import ForgotPasswordModal from "../components/FogotPasswordModal";


interface IPageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = (props: IPageLayoutProps) => {
  const { children } = props;
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
  const [isOpenSignUpModal, setIsOpenSignUpModal] = useState<boolean>(false);
  const [isOpenForgotPasswordModal, setIsOpenForgotPasswordModal] = useState<boolean>(false);


  return (
    <VStack
      width="full"
      minHeight="700px"
      height="full"
      position="relative"
      background="#F5F5F5"
    >
      <Box width="full" position="relative" zIndex={1}>
        <Header
          position="sticky"
          top="0"
          openLoginModal={() => setIsOpenLoginModal(true)}
          height="90px"
          background="#fff"
          color="#63687a"
          boxShadow="md"
          paddingBottom="14px"
          underLineHoverColor="#ff5533"
          hoverColor="#1a2b49"
        />
      </Box>
  
        {children}
   
        
        <LoginModal
        openForgotPasswordModal={() => setIsOpenForgotPasswordModal(true)}
        openSignUpModal={() => setIsOpenSignUpModal(true)}
        isOpen={isOpenLoginModal}
        onClose={() => setIsOpenLoginModal(false)}
      />
      <SignUpModal
        openLoginModal={() => setIsOpenLoginModal(true)}
        isOpen={isOpenSignUpModal}
        onClose={() => setIsOpenSignUpModal(false)}
      />
      <ForgotPasswordModal
        isOpen={isOpenForgotPasswordModal}
        onClose={() => setIsOpenForgotPasswordModal(false)}
      />
      <Footer />
    </VStack>
  );
};

export default PageLayout;
