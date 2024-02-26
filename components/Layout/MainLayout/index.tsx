'use client'
import { useState } from 'react'
import { VStack } from '@chakra-ui/react'
import Header from 'components/Header'
import LoginModal from './LoginModal'

interface IMainLayoutProps {
  children: React.ReactNode
}

const MainLayout = (props: IMainLayoutProps) => {
  const { children } = props
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false)

  return (
    <VStack width="full" position="relative">
      <Header openLoginModal={() => setIsOpenLoginModal(true)} />
      {children}
      <LoginModal isOpen={isOpenLoginModal} onClose={() => setIsOpenLoginModal(false)} />
    </VStack>
  )
}

export default MainLayout
