import { RefObject } from 'react'

interface ISideBarProps {
  sideBarRef: RefObject<HTMLDivElement>
  isCollapsed: boolean
  setIsCollapsed: (isCollapsed: boolean) => void
}

const SideBar = (props: ISideBarProps) => {
  const { sideBarRef, isCollapsed, setIsCollapsed } = props

  return (
    <div>
      <h1>SideBar</h1>
    </div>
  )
}

export default SideBar
