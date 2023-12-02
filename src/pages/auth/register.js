import {
  ArrowBackIcon,
  CalendarIcon,
  EmailIcon,
  LockIcon,
  PhoneIcon,
  ViewIcon,
  ViewOffIcon
} from '@chakra-ui/icons';
import {
  Button,
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
  InputRightElement,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  GenericAvatarIcon,
  Select
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { registerJobSeeker, regist, registerCompany } from '@/modules/fetch';
import { FaEarthAsia, FaLocationDot, FaMapLocation } from 'react-icons/fa6';

export default function Register() {
  //User
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [gender, setGender] = useState('');
  const [birthDay, setBirthDay] = useState('');
  //Company
  const [compName, setCompName] = useState('');
  const [compEmail, setCompEmail] = useState('');
  const [compPassword, setCompPassword] = useState('');
  const [compAddress, setCompAddress] = useState('');
  const [compPhone, setCompPhone] = useState('');
  const [compType, setCompType] = useState('');
  const [compWebsite, setCompWebsite] = useState('');

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
          Berhasil Registrasi.
        </Box>
      )
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

  const userRegisterHandler = async (e) => {
    e.preventDefault();
    console.log('TEST REGISTER ==>', birthDay);
    try {
      await registerJobSeeker({
        email: userEmail,
        password: userPassword,
        full_name: userName,
        gender: gender,
        phone_number: userPhone,
        address: userAddress,
        place_of_birth: birthPlace,
        date_of_birth: String(birthDay)
      });
      successToast();
      router.push('/auth/login');
    } catch (err) {
      errorToast(err);
    }
  };

  const companyRegisterHandler = async (e) => {
    e.preventDefault();
    try {
      await registerCompany({
        email: compEmail,
        password: compPassword,
        name: compName,
        type: compType,
        address: compAddress,
        phoneNumber: compPhone,
        website: compWebsite,
        companyEmail: compEmail
      });
      successToast();
      router.push('/');
    } catch (err) {
      errorToast(err);
    }
  };

  return (
    <Box pt={5} px={5} bg={'blue.500'} h={'100%'} w={'100%'}>
      <Link
        style={{ textDecoration: 'none' }}
        fontSize={{ base: '14px', md: '18', lg: '20px' }}
        fontFamily={'lexendDeca'}
        _hover={{ color: 'white', paddingLeft: '5px' }}
        transition={'0.3s'}
        color={'gray.300'}
        href={'/'}
      >
        <ArrowBackIcon /> Kembali
      </Link>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Head>
          <title>Register - CareerConnect</title>
        </Head>
        <Flex flex={4} align={'center'} justify={'center'} direction={'column'}>
          <Flex align={'center'} direction={'column'}>
            <Image
              src={'/images/CareerConnect-2.png'}
              alt={'CareerConnect-2.png'}
              mb={5}
              w={'12%'}
            />
            <Heading
              color={'#F5F5F5'}
              lineHeight={1}
              fontFamily={'lexendDeca'}
              fontSize={{ base: '24px', md: '28px', lg: '30px' }}
            >
              Career Connect
            </Heading>
            <Image
              src={'/images/homepage-no_background.png'}
              alt={'homepage-no_background.png'}
              w={'80%'}
            />
          </Flex>
        </Flex>
        <Flex py={5} flex={4} align={'center'} direction={'column'}>
          <Stack
            boxShadow={'xl'}
            bg={'#F5F5F5'}
            rounded={'xl'}
            p={5}
            spacing={{ base: 8 }}
            w={{ base: '97%', md: '90%', lg: '75%' }}
          >
            <Tabs align={'center'} isFitted variant="solid-rounded">
              <TabList color={'#112941'} fontFamily={'lexendDeca'}>
                <Tab>USER</Tab>
                <Tab>COMPANY</Tab>
              </TabList>
              <TabPanels>
                <TabPanel bgColor={'#F5F5F5'}>
                  <Stack mb={7} pt={3} align={'center'}>
                    <Heading
                      color={'#112941'}
                      fontFamily={'lexendDeca'}
                      lineHeight={1}
                      fontSize={{ base: '22px', md: '28', lg: '30px' }}
                    >
                      Register
                    </Heading>
                  </Stack>
                  <form onSubmit={userRegisterHandler}>
                    <Box fontFamily={'lexendDeca'}>
                      <Stack spacing={5}>
                        <FormControl isRequired>
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              <GenericAvatarIcon boxSize={6} color="gray.800" />
                            </InputLeftElement>
                            <Input
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                              name="userName"
                              type="text"
                              placeholder="Nama Lengkap"
                              fontWeight={'light'}
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
                              <EmailIcon color="gray.800" />
                            </InputLeftElement>
                            <Input
                              value={userEmail}
                              onChange={(e) => setUserEmail(e.target.value)}
                              name="userEmail"
                              type="email"
                              placeholder="Email"
                              fontWeight={'light'}
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
                              value={userPassword}
                              onChange={(e) => setUserPassword(e.target.value)}
                              name="userPassword"
                              type={show ? 'text' : 'password'}
                              placeholder="Kata sandi"
                              bg={'#D9D9D9'}
                              border={10}
                              fontWeight={'light'}
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
                        <FormControl isRequired>
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              <FaMapLocation color="gray.800" />
                            </InputLeftElement>
                            <Input
                              value={userAddress}
                              onChange={(e) => setUserAddress(e.target.value)}
                              name="userAddress"
                              type="text"
                              placeholder="Alamat"
                              fontWeight={'light'}
                              bg={'#D9D9D9'}
                              border={10}
                              color={'gray.800'}
                              _placeholder={{
                                color: 'gray.500'
                              }}
                            />
                          </InputGroup>
                        </FormControl>
                        <Stack align={'center'} direction={'row'}>
                          <FormControl isRequired>
                            <InputGroup>
                              <InputLeftElement pointerEvents="none">
                                <PhoneIcon color="gray.800" />
                              </InputLeftElement>
                              <Input
                                value={userPhone}
                                onChange={(e) => setUserPhone(e.target.value)}
                                name="userPhone"
                                type="number"
                                fontWeight={'light'}
                                placeholder="Telepon"
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
                                <FaLocationDot color="gray.800" />
                              </InputLeftElement>
                              <Input
                                value={birthPlace}
                                onChange={(e) => setBirthPlace(e.target.value)}
                                name="birthPlace"
                                type="text"
                                placeholder="Tempat Lahir"
                                fontWeight={'light'}
                                bg={'#D9D9D9'}
                                border={10}
                                color={'gray.800'}
                                _placeholder={{
                                  color: 'gray.500'
                                }}
                              />
                            </InputGroup>
                          </FormControl>
                        </Stack>
                        <Stack align={'center'} direction={'row'}>
                          <FormControl isRequired>
                            <InputGroup>
                              <Select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                variant={'filled'}
                                placeholder="Jenis Kelamin"
                                bgColor={'#D9D9D9'}
                                fontWeight={'light'}
                                border={10}
                                color={'gray.800'}
                                name="gender"
                              >
                                <option value="M">Laki - Laki</option>
                                <option value="F">Perempuan</option>
                              </Select>
                            </InputGroup>
                          </FormControl>
                          <FormControl isRequired>
                            <InputGroup>
                              <InputLeftElement pointerEvents="none">
                                <CalendarIcon color="gray.800" />
                              </InputLeftElement>
                              <Input
                                value={birthDay}
                                onChange={(e) => setBirthDay(e.target.value)}
                                name="birthDay"
                                type="date"
                                placeholder="Tanggal Lahir"
                                fontWeight={'light'}
                                bg={'#D9D9D9'}
                                border={10}
                                color={'gray.800'}
                                _placeholder={{
                                  color: 'gray.500'
                                }}
                              />
                            </InputGroup>
                          </FormControl>
                        </Stack>
                      </Stack>
                      <Button
                        type="submit"
                        fontFamily={'lexendDeca'}
                        fontWeight={'semibold'}
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
                        Register
                      </Button>
                      <Stack pt={10}>
                        <Text
                          fontSize={{ base: '13px', md: '14px', lg: '15px' }}
                          align={'center'}
                        >
                          Sudah punya akun?{' '}
                          <Link
                            style={{ textDecoration: 'none' }}
                            color={'blue.400'}
                            href={'/auth/login'}
                          >
                            Login
                          </Link>
                        </Text>
                      </Stack>
                    </Box>
                  </form>
                </TabPanel>
                <TabPanel>
                  <Stack mb={7} pt={3} align={'center'}>
                    <Heading
                      color={'#112941'}
                      fontFamily={'lexendDeca'}
                      lineHeight={1}
                      fontSize={{ base: '22px', md: '28', lg: '30px' }}
                    >
                      Register
                    </Heading>
                  </Stack>
                  <form onSubmit={companyRegisterHandler}>
                    <Box fontFamily={'lexendDeca'}>
                      <Stack spacing={5}>
                        <FormControl isRequired>
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              <GenericAvatarIcon boxSize={6} color="gray.800" />
                            </InputLeftElement>
                            <Input
                              value={compName}
                              onChange={(e) => setCompName(e.target.value)}
                              name="compName"
                              type="text"
                              placeholder="Nama Company"
                              fontWeight={'light'}
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
                              <EmailIcon color="gray.800" />
                            </InputLeftElement>
                            <Input
                              value={compEmail}
                              onChange={(e) => setCompEmail(e.target.value)}
                              name="compEmail"
                              type="email"
                              placeholder="Email"
                              fontWeight={'light'}
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
                              value={compPassword}
                              onChange={(e) => setCompPassword(e.target.value)}
                              name="compPassword"
                              type={show ? 'text' : 'password'}
                              placeholder="Kata sandi"
                              fontWeight={'light'}
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
                        <FormControl isRequired>
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              <FaMapLocation color="gray.800" />
                            </InputLeftElement>
                            <Input
                              value={compAddress}
                              onChange={(e) => setCompAddress(e.target.value)}
                              name="compAddress"
                              type="text"
                              placeholder="Alamat"
                              fontWeight={'light'}
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
                              <PhoneIcon color="gray.800" />
                            </InputLeftElement>
                            <Input
                              value={compPhone}
                              onChange={(e) => setCompPhone(e.target.value)}
                              name="compPhone"
                              type="number"
                              placeholder="Telepon"
                              fontWeight={'light'}
                              bg={'#D9D9D9'}
                              border={10}
                              color={'gray.800'}
                              _placeholder={{
                                color: 'gray.500'
                              }}
                            />
                          </InputGroup>
                        </FormControl>
                        <Stack align={'center'} direction={'row'}>
                          <FormControl isRequired>
                            <InputGroup>
                              <Select
                                value={compType}
                                onChange={(e) => setCompType(e.target.value)}
                                variant={'filled'}
                                placeholder="Jenis Company"
                                fontWeight={'light'}
                                bgColor={'#D9D9D9'}
                                border={10}
                                color={'gray.800'}
                                name="compType"
                              >
                                <option value="Technology">Technology</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Finance">Finance</option>
                                <option value="Education">Education</option>
                                <option value="Retail">Retail</option>
                                <option value="Entertainment">
                                  Entertainment
                                </option>
                                <option value="Manufacturing">
                                  Manufacturing
                                </option>
                                <option value="Consulting">Consulting</option>
                                <option value="Energy">Energy</option>
                              </Select>
                            </InputGroup>
                          </FormControl>
                          <FormControl isRequired>
                            <InputGroup>
                              <InputLeftElement pointerEvents="none">
                                <FaEarthAsia color="gray.800" />
                              </InputLeftElement>
                              <Input
                                value={compWebsite}
                                onChange={(e) => setCompWebsite(e.target.value)}
                                name="compWebsite"
                                type="text"
                                placeholder="Website"
                                fontWeight={'light'}
                                bg={'#D9D9D9'}
                                border={10}
                                color={'gray.800'}
                                _placeholder={{
                                  color: 'gray.500'
                                }}
                              />
                            </InputGroup>
                          </FormControl>
                        </Stack>
                      </Stack>
                      <Button
                        type="submit"
                        fontFamily={'lexendDeca'}
                        fontWeight={'semibold'}
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
                        Register
                      </Button>
                      <Stack pt={10}>
                        <Text
                          fontSize={{ base: '13px', md: '14px', lg: '15px' }}
                          align={'center'}
                        >
                          Sudah punya akun?{' '}
                          <Link
                            style={{ textDecoration: 'none' }}
                            color={'blue.400'}
                            href={'/auth/login'}
                          >
                            Login
                          </Link>
                        </Text>
                      </Stack>
                    </Box>
                  </form>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  );
}
