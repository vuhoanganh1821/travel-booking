"use client";
import { useState } from "react";
import { VStack } from "@chakra-ui/react";
import HeaderHome from "components/Layout/WebLayout/HomeLayout/HeaderHome";
import LoginModal from "../components/LoginModal";
import Footer from "components/Footer";

interface IMainLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = (props: IMainLayoutProps) => {
  const { children } = props;
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);

  return (
    <VStack width="full" position="relative">
      <HeaderHome openLoginModal={() => setIsOpenLoginModal(true)} />
      {children}
      <LoginModal
        isOpen={isOpenLoginModal}
        onClose={() => setIsOpenLoginModal(false)}
      />
      <Footer />
    </VStack>
  );
};

export default HomeLayout;
