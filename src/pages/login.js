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

export default function SplitScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [show, setShow] = useState(false);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const handleClick = () => setShow(!show);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(email, password);
      window.localStorage.setItem('token', token.token);
      toast({
        title: 'Success',
        description: 'You have successfully login.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-center',
        render: () => (
          <Box
            textAlign={'center'}
            borderRadius={20}
            color="white"
            p={3}
            bg="green.500"
          >
            Berhasil login.
          </Box>
        )
      });
      setIsLogin(true);
      router.push('/dashboard');
    } catch (err) {
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
    }
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Head>
        <title>Login</title>
      </Head>
      <Flex flex={4} align={'center'} justify={'center'} direction={'column'}>
        <Box p={5} bg={'#2A5C91'} h={'100%'} w={'100%'}>
          <Link
            style={{ textDecoration: 'none' }}
            fontSize={{ base: '14px', md: '18', lg: '20px' }}
            color={'#F5F5F5'}
            href={'../'}
          >
            <ArrowBackIcon /> Kembali
          </Link>
          <Flex pt={10} align={'center'} direction={'column'}>
            <Image
              src={'/homepage-no_background.png'}
              alt={'homepage-no_background.png'}
              w={'75%'}
            />
          </Flex>
        </Box>
      </Flex>
      <Flex py={5} flex={3} align={'center'} direction={'column'}>
        <Image
          src={'/CareerConnect-1.png'}
          alt={'CareerConnect-1.png'}
          my={5}
          w={'16%'}
        />
        <Heading
          color={'#112941'}
          lineHeight={1}
          mb={10}
          fontSize={{ base: '24px', md: '30', lg: '32px' }}
        >
          Career Connect
        </Heading>
        <Stack
          boxShadow={'xl'}
          bg={'#F5F5F5'}
          rounded={'xl'}
          mx={10}
          pt={7}
          pb={5}
          px={3}
          spacing={{ base: 8 }}
          minW={'65%'}
        >
          <Stack mb={5} align={'center'}>
            <Heading
              color={'#112941'}
              lineHeight={1}
              fontSize={{ base: '22px', md: '28', lg: '30px' }}
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
                      bg={'#D9D9D9'}
                      border={10}
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
                      bg={'#D9D9D9'}
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
                mt={10}
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
                >
                  Lupa sandi?
                </Link>
              </Stack>
              <Stack pt={10}>
                <Text
                  fontSize={{ base: '13px', md: '14px', lg: '15px' }}
                  align={'center'}
                >
                  Sudah punya akun?{' '}
                  <Link
                    style={{ textDecoration: 'none' }}
                    color={'blue.400'}
                    href={'/'}
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
