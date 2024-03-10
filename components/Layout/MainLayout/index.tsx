'use client'
import { useEffect, useState } from 'react'
import { VStack } from '@chakra-ui/react'
import Header from 'components/Header'
import { PLATFORM } from 'enums/common'
import { useStores } from 'hooks/useStores'
import { observer } from 'mobx-react'
import LoginModal from './LoginModal'

interface IMainLayoutProps {
  children: React.ReactNode
}

const MainLayout = (props: IMainLayoutProps) => {
  const { children } = props
  const { authStore } = useStores()
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false)

  useEffect(() => {
    authStore.getMyUser(PLATFORM.WEBSITE)
  }, [])

  return (
    <VStack width="full" position="relative">
      <Header openLoginModal={() => setIsOpenLoginModal(true)} />
      {children}
      <LoginModal isOpen={isOpenLoginModal} onClose={() => setIsOpenLoginModal(false)} />
    </VStack>
  )
}

export default observer(MainLayout)
