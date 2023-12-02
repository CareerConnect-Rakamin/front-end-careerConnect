import { validateToken } from '@/hooks/tokenValidation';
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Grid,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  FaLocationDot,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
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
          _hover={{ textDecoration: 'none', color: 'custom.light_orange' }}
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isJobseeker, setIsJobseeker] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const user = await validateToken();
      if (user) {
        setIsAuthenticated(true);
        if (user.role === 'jobseeker') {
          setIsJobseeker(true);
        }
        if (user.role === 'company') {
          setIsCompany(true);
        }
      }
    };
    const token = window.localStorage.getItem('token');
    if (token) {
      checkUser();
    }
  }, []);

  const toastFailed = (role) => {
    toast({
      title: 'Failed',
      description: `Anda Sudah Masuk Sebagai ${role}!`,
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });
  };

  const toastDeniedJobseeker = () => {
    toast({
      title: 'Failed',
      description: 'Anda Harus Masuk Sebagai Company',
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });
  };

  return (
    <SimpleGrid templateColumns={'repeat(4, 1fr)'} gap={10}>
      <Box color={'white'}>
        <Text fontWeight={'semibold'} fontSize={'lg'} marginBottom={3}>
          Kontak
        </Text>
        <Grid rowGap={3} fontWeight={'light'} fontSize={'sm'}>
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
        <Grid rowGap={2} fontWeight={'light'} fontSize={'sm'}>
          <Link
            onClick={() => {
              isAuthenticated
                ? isJobseeker
                  ? toastFailed('Jobseeker')
                  : toastFailed('Company')
                : router.push('/auth/register');
            }}
            _hover={{
              color: 'gray.300',
              textDecoration: 'none'
            }}
          >
            <Text>Registrasi Pencari Kerja</Text>
          </Link>
          <Link
            href="/search/jobs"
            _hover={{
              color: 'gray.300',
              textDecoration: 'none'
            }}
          >
            <Text>Cari Lowongan Kerja</Text>
          </Link>
          <Link
            href="/?job_type=WFH"
            _hover={{
              color: 'gray.300',
              textDecoration: 'none'
            }}
          >
            <Text>Kerja Dari Rumah</Text>
          </Link>
          <Link
            href="/?job_type=WFO"
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
        <Grid rowGap={2} fontWeight={'light'} fontSize={'sm'}>
          <Link
            onClick={() => {
              isAuthenticated
                ? isCompany
                  ? toastFailed('Company')
                  : toastFailed('Jobseeker')
                : router.push('/auth/register');
            }}
            _hover={{
              color: 'gray.300',
              textDecoration: 'none'
            }}
          >
            <Text>Registrasi Perusahaan</Text>
          </Link>
          <Link
            onClick={() => {
              isAuthenticated
                ? isCompany
                  ? router.push('/jobs/add')
                  : toastDeniedJobseeker()
                : router.push('/auth/login');
            }}
            _hover={{
              color: 'gray.300',
              textDecoration: 'none'
            }}
          >
            <Text>Pasang Lowongan Pekerjaan</Text>
          </Link>
        </Grid>
      </Box>

      <Box color={'white'}>
        <Text fontWeight={'semibold'} fontSize={'lg'} marginBottom={3}>
          Sosial Media
        </Text>
        <Flex alignItems={'center'} gap={3}>
          <Link fontSize={'2xl'} _hover={{ color: 'custom.light_orange' }}>
            <FaInstagram />
          </Link>
          <Link fontSize={'2xl'} _hover={{ color: 'custom.light_orange' }}>
            <FaLinkedinIn />
          </Link>
          <Link fontSize={'2xl'} _hover={{ color: 'custom.light_orange' }}>
            <FaXTwitter />
          </Link>
          <Link fontSize={'2xl'} _hover={{ color: 'custom.light_orange' }}>
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
    <Stack
      as="footer"
      w="full"
      bg="custom.dark_blue"
      bottom={0}
      fontFamily="lexendDeca"
      p={5}
    >
      <HeaderFooter />
      <BodyFooter />
      <BottomFooter />
    </Stack>
  );
};

export default Footer;
