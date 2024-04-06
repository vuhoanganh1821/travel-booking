'use client'
import React, { ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { useStores } from 'hooks/useStores'
import { PLATFORM } from 'enums/common'
import Head from 'next/head'
import SideBar from './SideBar'
import TopBar from './TopBar'

interface ICMSLayoutProps {
  title: string
  children?: ReactNode
  topBarTitle: string
}

const CMSLayout = (props: ICMSLayoutProps) => {
  const { title, children, topBarTitle } = props
  const { authStore } = useStores()

  const [isCollapsed, setIsCollapsedState] = useState<boolean>(false)

  function setIsCollapsed(newIsCollapsed: boolean): void {
    setIsCollapsedState(newIsCollapsed)
  }

  useEffect(() => {
    authStore.getMyUser(PLATFORM.CMS)
  }, [authStore])

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon_black.png" />
      </Head>
      <main>
        <Flex backgroundColor="gray.100" minHeight="100vh">
          <SideBar />
          <Box flex={1} flexDirection="column" backgroundColor="gray.100">
            <TopBar title={topBarTitle} isCollapsedSidebar={isCollapsed} setIsCollapsedSidebar={setIsCollapsed} />
            <Box
              marginLeft="320px"
              marginTop={{ base: -2, md: '72px' }}
              marginBottom={{ base: 6, lg: 8 }}
            >
              {children}
            </Box>
          </Box>
        </Flex>
      </main>
    </>
  )
}

export default CMSLayout
