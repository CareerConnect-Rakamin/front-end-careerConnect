import {
  ArrowBackIcon,
  EmailIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon
} from '@chakra-ui/icons';
import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  Heading,
  Input,
  Stack,
  Image,
  Box,
  Link,
  useToast,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { loginUser } from '@/modules/fetch';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      router.push('/');
    }
  }, []);

  const handleClick = () => setShow(!show);

  const successToast = () => {
    toast({
      title: 'Berhasil Login',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });
  };

  const errorToast = (err) => {
    toast({
      title: 'Failed',
      description: 'Error',
      status: 'failed',
      duration: 3000,
      isClosable: true,
      position: 'top-center',
      render: () => (
        <Box
          textAlign={'center'}
          borderRadius={20}
          color="white"
          p={3}
          bg="red.500"
        >
          {err.message}
        </Box>
      )
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(email, password);
      window.localStorage.setItem('token', token.token);
      router.push('/');
      successToast();
    } catch (err) {
      errorToast(err);
    }
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Head>
        <title>Login - CareerConnect</title>
      </Head>
      <Flex flex={4} align={'center'} justify={'center'} direction={'column'}>
        <Box
          p={5}
          bgImage={'/images/login-sidephoto.jpg'}
          backgroundSize={'cover'}
          h={'100%'}
          w={'100%'}
        >
          <Link
            style={{ textDecoration: 'none' }}
            fontSize={{ base: '14px', md: '18', lg: '20px' }}
            fontFamily={'lexendDeca'}
            _hover={{ color: 'custom.blue', paddingLeft: '5px' }}
            transition={'0.3s'}
            color={'gray.500'}
            href={'/'}
          >
            <ArrowBackIcon /> Kembali
          </Link>
        </Box>
      </Flex>
      <Flex
        py={3}
        flex={3}
        align={'center'}
        direction={'column'}
        fontFamily={'lexendDeca'}
      >
        <Image
          src={'/CareerConnect-1.png'}
          alt={'CareerConnect-1.png'}
          my={5}
          w={'16%'}
        />
        <Heading
          color={'custom.dark_blue'}
          lineHeight={1}
          mb={8}
          fontSize={{ base: '24px', md: '30', lg: '32px' }}
          fontFamily={'lexendDeca'}
        >
          Career Connect
        </Heading>
        <Stack
          boxShadow={'2xl'}
          bg={'#F5F5F5'}
          rounded={'xl'}
          mx={10}
          pt={7}
          pb={5}
          px={3}
          spacing={{ base: 8 }}
          minW={'65%'}
        >
          <Stack mb={2} align={'center'}>
            <Heading
              color={'custom.dark_blue'}
              lineHeight={1}
              fontSize={{ base: '22px', md: '28', lg: '30px' }}
              fontFamily={'lexendDeca'}
            >
              Login
            </Heading>
          </Stack>
          <form onSubmit={loginHandler}>
            <Box px={5}>
              <Stack spacing={7}>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <EmailIcon color="gray.800" />
                    </InputLeftElement>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      type="email"
                      placeholder="Email"
                      bg={'#e7e7e7e7'}
                      border={10}
                      fontWeight={'light'}
                      fontSize={'sm'}
                      color={'gray.800'}
                      _placeholder={{
                        color: 'gray.500'
                      }}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <LockIcon color="gray.800" />
                    </InputLeftElement>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      type={show ? 'text' : 'password'}
                      placeholder="Kata sandi"
                      bg={'#e7e7e7e7'}
                      fontWeight={'light'}
                      fontSize={'sm'}
                      border={10}
                      color={'gray.800'}
                      _placeholder={{
                        color: 'gray.500'
                      }}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        bgColor={'transparent'}
                        h="1.75rem"
                        size="md"
                        onClick={handleClick}
                      >
                        {show ? (
                          <ViewIcon color="gray.800" />
                        ) : (
                          <ViewOffIcon color="gray.800" />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Stack>
              <Button
                type="submit"
                fontFamily={'heading'}
                mt={8}
                w={'full'}
                bg={'#2A5C91'}
                color={'white'}
                fontSize={{ base: '16px', md: '17px', lg: '18px' }}
                _hover={{
                  bgColor: '#112941',
                  boxShadow: 'xl'
                }}
              >
                Login
              </Button>
              <Stack
                mt={3}
                direction={'row'}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox borderColor={'gray.500'}>
                  <Text fontSize={{ base: '12px', md: '13px', lg: '14px' }}>
                    Simpan sandi
                  </Text>
                </Checkbox>
                <Link
                  style={{ textDecoration: 'none' }}
                  fontSize={{ base: '12px', md: '13px', lg: '14px' }}
                  color={'blue.400'}
                  href={'/'}
                  _hover={{ color: 'gray.500' }}
                >
                  Lupa sandi?
                </Link>
              </Stack>
              <Stack pt={10}>
                <Text
                  fontSize={{ base: '13px', md: '14px', lg: '15px' }}
                  align={'center'}
                >
                  Belum punya akun?{' '}
                  <Link
                    style={{ textDecoration: 'none' }}
                    color={'blue.400'}
                    _hover={{ color: 'red.500' }}
                    href={'/auth/register'}
                  >
                    Register
                  </Link>
                </Text>
              </Stack>
            </Box>
          </form>
        </Stack>
      </Flex>
    </Stack>
  );
}
