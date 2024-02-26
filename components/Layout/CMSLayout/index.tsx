"use client"
import React, { ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
// import { LocalStorageKeyEnum } from 'enums/common'
// import EFeatureFlags from 'enums/featureFlags'
// import { useStores } from 'hooks/useStores'
import Head from 'next/head'
// import { FeatureFlag } from 'react-unleash-flags'
// import { PLATFORM } from 'API/constants'
// import { CMSLayoutContext } from './cmsLayout.context'
// import SideBar from 'components/Sidebar'
import TopBar from 'components/TopBar'
import { LocalStorageKeyEnum } from 'enums/common'

interface ICMSLayoutProps {
  title: string
  children?: ReactNode
  topBarTitle: string
}

const CMSLayout = (props: ICMSLayoutProps) => {
  const { title, children, topBarTitle } = props
  // const { authStore } = useStores()

  const [isCollapsed, setIsCollapsedState] = useState<boolean>(false)
  const sideBarRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  function setIsCollapsed(newIsCollapsed: boolean): void {
    setIsCollapsedState(newIsCollapsed)
    sessionStorage.setItem(LocalStorageKeyEnum.IS_SIDEBAR_COLLAPSED, newIsCollapsed.toString())
  }

  // useEffect(() => {
  //   authStore.getAccessToken(PLATFORM.CMS)
  //   if (window) {
  //     if (sessionStorage.getItem(LocalStorageKeyEnum.IS_SIDEBAR_COLLAPSED) === 'true') {
  //       setIsCollapsedState(true)
  //     }
  //   }
  // }, [])

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon_black.png" />
      </Head>
      <main>
        {/* <CMSLayoutContext.Provider value={{ isSidebarCollapsed: isCollapsed, sideBarRef }}> */}
          <Flex backgroundColor="gray.100" minHeight="100vh">
            {/* <SideBar sideBarRef={sideBarRef} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} /> */}
            <Box flex={1} flexDirection="column" backgroundColor="gray.100">
              <TopBar title={topBarTitle} isCollapsedSidebar={isCollapsed} setIsCollapsedSidebar={setIsCollapsed} />
              <Box
                //* TODO: Fix case mobile later
                marginTop={{ base: -2, md: '72px' }}
                marginLeft={{ md: '80px', lg: isCollapsed ? '80px' : '320px' }}
                marginBottom={{ base: 6, lg: 8 }}
              >
                {children}
              </Box>
            </Box>
          </Flex>
        {/* </CMSLayoutContext.Provider> */}
      </main>
    </>
  )
}

export default CMSLayout
