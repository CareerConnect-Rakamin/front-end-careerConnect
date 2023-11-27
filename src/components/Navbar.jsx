import { useEffect, useState } from 'react';
import {
  Flex,
  Button,
  Image,
  Link,
  Text,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalFooter,
  useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { getPhotoProfile } from '@/modules/fetch';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const [photoProfile, setPhotoPofile] = useState(null);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      setIsLogin(true);
      getPhotoProfile(token)
        .then((data) => {
          setPhotoPofile(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleLogout = async () => {
    window.localStorage.removeItem('token');
    setIsLogin(false);
    router.push('/');
    toast({
      title: 'Berhasil Logout',
      status: 'success',
      duration: 3000,
      position: 'top'
    });
  };

  return (
    <Flex
      position={'fixed'}
      width={'full'}
      as={'nav'}
      justify="space-between"
      background={'custom.blue'}
      p={'1rem'}
      fontFamily={'lexendDeca'}
      zIndex={1}
    >
      <Flex display={'flex'} alignItems={'center'} marginLeft={3}>
        <Link href="/">
          <Image src="/images/logo.png" alt="Logo" width="40px" />
        </Link>
        <Link href="/" _hover={{ textDecoration: 'none' }} marginLeft={2}>
          <Text
            color={'white'}
            fontSize={'2xl'}
            fontWeight={'bold'}
            _hover={{ color: 'gray.300' }}
            transition={'0.2s'}
          >
            CareerConnect
          </Text>
        </Link>
      </Flex>
      <Flex display={'flex'} alignItems={'center'}>
        <Link
          href="/search-jobs"
          color={'white'}
          _hover={{ color: 'gray.300', paddingBottom: '5px' }}
          transition={'0.2s'}
          marginRight={3}
          fontWeight={'semibold'}
        >
          Cari Lowongan
        </Link>
        <Link
          href="/companys"
          color={'white'}
          _hover={{ color: 'gray.300', paddingBottom: '5px' }}
          transition={'0.2s'}
          marginRight={3}
          fontWeight={'semibold'}
        >
          Profile Perusahaan
        </Link>
        <Link
          href="/about"
          color={'white'}
          _hover={{ color: 'gray.300', paddingBottom: '5px' }}
          transition={'0.2s'}
          marginRight={3}
          fontWeight={'semibold'}
        >
          <Text>Tentang Kami</Text>
        </Link>
      </Flex>
      <Stack direction={'row'} marginRight={3}>
        {isLogin ? (
          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}
            >
              <Avatar
                size={'sm'}
                src={
                  `http://localhost:3000/api/v1/${photoProfile}` ||
                  'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                }
              />
            </MenuButton>
            <MenuList>
              <Link href="/user/profile" _hover={{ textDecoration: 'none' }}>
                <MenuItem>Profile</MenuItem>
              </Link>
              <MenuDivider />
              <MenuItem onClick={onOpen}>Logout</MenuItem>
            </MenuList>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent alignItems={'center'}>
                <ModalHeader>Apakah anda yakin ingin keluar?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>Tekan &quot;Logout&quot; jika ingin keluar</Text>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={handleLogout} colorScheme={'red'}>
                    Logout
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Menu>
        ) : (
          <>
            <Link href="/auth/register">
              <Button
                bg={'custom.blue'}
                width={'105px'}
                textColor={'white'}
                rounded={10}
                marginRight={2}
                _hover={{
                  bg: 'orange.300',
                  transform: 'scale(1.05)'
                }}
              >
                Register
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                bg={'white'}
                color={'custom.blue'}
                width={'105px'}
                fontWeight={'semibold'}
                rounded={10}
                _hover={{
                  bg: 'blue.300',
                  color: 'white',
                  transform: 'scale(1.05)'
                }}
              >
                Login
              </Button>
            </Link>
          </>
        )}
      </Stack>
    </Flex>
  );
};

export default Navbar;
