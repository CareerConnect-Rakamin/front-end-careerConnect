import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Grid,
  Image,
  Link,
  SimpleGrid,
  Text
} from '@chakra-ui/react';
import {
  FaLocationDot,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaFacebook
} from 'react-icons/fa6';

const HeaderFooter = () => {
  return (
    <Flex justifyContent={'space-between'} marginBottom={6}>
      <Flex color="white" width={['full', 320]} borderRadius="md">
        <Text fontSize={['lg', '2xl']} fontWeight="semibold">
          Butuh Konsultasi? Silahkan Kontak Kami Kami Siap Membantu
        </Text>
      </Flex>
      <Flex color="white" gap={2} alignItems="center" marginRight={5}>
        <Image src="/images/logo.png" alt="Logo" boxSize={['10px', '20px']} />
        <Link
          href="/"
          _hover={{ textDecoration: 'none', color: 'custom.ligth_orange' }}
        >
          <Text fontSize={['sm', '2xl']} fontWeight="semibold">
            CareerConnect
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
};

const BodyFooter = () => {
  return (
    <SimpleGrid templateColumns={'repeat(4, 1fr)'} gap={10}>
      <Box color={'white'}>
        <Text fontWeight={'semibold'} fontSize={'lg'} marginBottom={3}>
          Kontak
        </Text>
        <Grid rowGap={3}>
          <Link
            _hover={{
              color: 'gray.300',
              textDecoration: 'none'
            }}
          >
            <Flex align="center">
              <FaLocationDot />
              <Text marginLeft={'10px'}>
                JI. Letnan Tukiyat 20 Condong Catur Yogyakarta Indonesia
              </Text>
            </Flex>
          </Link>
          <Link
            href="mailto:CareerConnect@gmail.com"
            _hover={{
              color: 'gray.300',
              textDecoration: 'none'
            }}
          >
            <Text>
              <EmailIcon /> CareerConnect@gmail.com
            </Text>
          </Link>
          <Link
            href="tel:081254222388"
            _hover={{
              color: 'gray.300',
              textDecoration: 'none'
            }}
          >
            <Text>
              <PhoneIcon /> 0812 5422 2388
            </Text>
          </Link>
        </Grid>
      </Box>

      <Box color={'white'}>
        <Text fontWeight={'semibold'} fontSize={'lg'} marginBottom={3}>
          Pencari Kerja
        </Text>
        <Grid rowGap={2}>
          <Link
            _hover={{
              color: 'gray.300',
              textDecoration: 'none'
            }}
          >
            <Text>Registrasi Pencari Kerja</Text>
          </Link>
          <Link
            _hover={{
              color: 'gray.300',
              textDecoration: 'none'
            }}
          >
            <Text>Cari Lowongan Kerja</Text>
          </Link>
          <Link
            _hover={{
              color: 'gray.300',
              textDecoration: 'none'
            }}
          >
            <Text>Kerja Dari Rumah</Text>
          </Link>
          <Link
            _hover={{
              color: 'gray.300',
              textDecoration: 'none'
            }}
          >
            <Text>Kerja Dari Kantor</Text>
          </Link>
        </Grid>
      </Box>

      <Box color={'white'}>
        <Text fontWeight={'semibold'} fontSize={'lg'} marginBottom={3}>
          Perusahaan
        </Text>
        <Grid rowGap={2}>
          <Link
            _hover={{
              color: 'gray.300',
              textDecoration: 'none'
            }}
          >
            <Text>Registrasi Perusahaan</Text>
          </Link>
          <Link
            _hover={{
              color: 'gray.300',
              textDecoration: 'none'
            }}
          >
            <Text>Pasang Lowongan Pekerjaan</Text>
          </Link>
          <Link
            _hover={{
              color: 'gray.300',
              textDecoration: 'none'
            }}
          >
            <Text>Temukan Kandidat Terbaik</Text>
          </Link>
          <Link
            _hover={{
              color: 'gray.300',
              textDecoration: 'none'
            }}
          >
            <Text>Harga Upload Lowongan</Text>
          </Link>
        </Grid>
      </Box>

      <Box color={'white'}>
        <Text fontWeight={'semibold'} fontSize={'lg'} marginBottom={3}>
          Sosial Media
        </Text>
        <Flex alignItems={'center'} gap={3}>
          <Link fontSize={'2xl'} _hover={{ color: 'custom.ligth_orange' }}>
            <FaInstagram />
          </Link>
          <Link fontSize={'2xl'} _hover={{ color: 'custom.ligth_orange' }}>
            <FaLinkedinIn />
          </Link>
          <Link fontSize={'2xl'} _hover={{ color: 'custom.ligth_orange' }}>
            <FaTwitter />
          </Link>
          <Link fontSize={'2xl'} _hover={{ color: 'custom.ligth_orange' }}>
            <FaFacebook />
          </Link>
        </Flex>
      </Box>
    </SimpleGrid>
  );
};

const BottomFooter = () => {
  return (
    <Flex justifyContent={'center'} marginTop={10}>
      <Text color={'white'}>2023 CareerConnect PT Kelompok 3A Rakamin</Text>
    </Flex>
  );
};

const Footer = () => {
  return (
    <Box
      as="footer"
      w="full"
      bg="custom.dark_blue"
      position="relative"
      bottom={0}
      fontFamily="lexendDeca"
      zIndex={1}
      p={5}
    >
      <HeaderFooter />
      <BodyFooter />
      <BottomFooter />
    </Box>
  );
};

export default Footer;
