import { Center, HStack, Img } from '@chakra-ui/react'
import SearchInput from 'components/SearchInput'
import UserProfile from 'components/UserProfile'
import { PLATFORM } from 'enums/common'

interface IHeaderProps {
  openLoginModal: () => void
}

const Header = (props: IHeaderProps) => {
  const { openLoginModal } = props

  return (
    <Center width="full" boxShadow="md">
      <HStack maxWidth="1200px" width="full" height="80px" justify="space-between" paddingX={8}>
        <HStack spacing={10}>
          <Img src="assets/images/logo.jpg" alt="logo" boxSize={10} cursor="pointer" />
          <SearchInput width="500px" placeholder="Search tours by name" />
        </HStack>
        <UserProfile platform={PLATFORM.WEBSITE} openLoginModal={openLoginModal} />
      </HStack>
    </Center>
  )
}

export default Header