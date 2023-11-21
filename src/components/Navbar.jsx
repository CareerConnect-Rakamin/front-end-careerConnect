import { Box, Link, Text, Flex, Stack, Button } from '@chakra-ui/react';
import Image from 'next/image';
import logo from '../../public/logo.png';

const Navbar = () => {
  return (
    <Box
      bg="#2A5C91"
      p={2}
      fontFamily={'Lexend Deca'}
      position="fixed"
      top={0}
      width="100%"
      zIndex="100"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mx="auto"
        maxW="container"
      >
        <Flex gap={5}>
          <Image
            src={logo}
            style={{ width: '45px', height: '38px', marginTop: '10px' }}
          />
          <Text color="white" fontSize="33px" fontWeight="bold" mt={'5px'}>
            <Link href="#" color="white">
              CareerConnect
            </Link>
          </Text>
        </Flex>

        {/* Navigasi (tengah) */}
        <Flex
          alignItems="center"
          fontSize="20px"
          fontWeight="semibold"
          mr={'50px'}
        >
          <Link href="#" color="white" mx={2}>
            Cari Lowongan
          </Link>
          <Link href="#" color="white" mx={2}>
            Profile Perusahaan
          </Link>
          <Link to="#" color="white" mx={2}>
            Tentang Kami
          </Link>
        </Flex>

        {/* Tombol Login (sebelah kanan) */}
        <Stack direction="row" spacing={0} alignItems="center">
          <Link>
            <Button
              bg={'#2A5C91'}
              p={'5px'}
              width={'120px'}
              textColor={'white'}
              rounded={5}
              _hover={{ transform: 'scale(1.05)' }}
            >
              Register
            </Button>
          </Link>
          <Link>
            <Button
              bg={'white'}
              p={'5px'}
              width={'120px'}
              rounded={5}
              _hover={{ transform: 'scale(1.05)' }}
            >
              Login
            </Button>
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Navbar;
