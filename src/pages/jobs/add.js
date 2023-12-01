import { ArrowBackIcon } from '@chakra-ui/icons';
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
  Select,
  Textarea
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { createJob } from '@/modules/fetch';
import { validateToken } from '@/hooks/tokenValidation';

export default function AddJob() {
  const [jobName, setName] = useState('');
  const [jobDesc, setDesc] = useState('');
  const [jobLocation, setLocation] = useState('');
  const [jobCategory, setCategory] = useState('');
  const [jobType, setType] = useState('');
  const [jobCapacity, setCapacity] = useState('');
  const [jobSalary, setSalary] = useState('');
  const [closeDate, setCloseDate] = useState('');
  const [jobDo, setJobDo] = useState('');
  const [jobNeed, setJobNeed] = useState('');

  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const authUser = async () => {
      try {
        const user = await validateToken();
        if (user.role !== 'company') {
          router.push('/');
        }
      } catch (e) {
        console.log(e);
      }
    };
    const token = window.localStorage.getItem('token');
    if (token) {
      authUser();
    } else {
      router.push('/');
    }
  }, []);

  const successToast = () => {
    toast({
      title: 'Success',
      description: 'You have successfully created job.',
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
          Berhasil Menambahkan Lowongan.
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

  const createJobHandler = async (e) => {
    e.preventDefault();
    try {
      const clearDo = jobDo.replace(/-/g, '').split('\n');
      const clearNeed = jobNeed.replace(/-/g, '').split('\n');
      const arrayDo = clearDo
        .map((item) => item.trim())
        .filter((item) => item !== '');
      const arrayNeed = clearNeed
        .map((item) => item.trim())
        .filter((item) => item !== '');
      await createJob({
        name: jobName,
        description: jobDesc,
        what_will_you_do: arrayDo,
        what_will_you_need: arrayNeed,
        location: jobLocation,
        category: jobCategory,
        job_type: jobType,
        salary: jobSalary,
        capacity: jobCapacity,
        closing_date: closeDate
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
          <title>Tambah Lowongan</title>
        </Head>
        <Flex py={5} flex={4} align={'center'} direction={'column'}>
          <Stack
            boxShadow={'xl'}
            bg={'#F5F5F5'}
            rounded={'xl'}
            p={5}
            spacing={{ base: 8 }}
            w={{ base: '100%', md: '100%', lg: '90%' }}
          >
            <Stack pt={3} align={'center'}>
              <Heading
                color={'#112941'}
                fontFamily={'lexendDeca'}
                lineHeight={1}
                fontSize={{ base: '22px', md: '24px', lg: '26px' }}
              >
                Lowongan Pekerjaan
              </Heading>
            </Stack>
            <form onSubmit={createJobHandler}>
              <Box px={'3%'} fontFamily={'lexendDeca'}>
                <Stack spacing={5}>
                  <FormControl isRequired>
                    <Input
                      value={jobName}
                      onChange={(e) => setName(e.target.value)}
                      name="Name"
                      type="text"
                      placeholder="Nama Pekerjaan"
                      fontWeight={'light'}
                      bg={'#D9D9D9'}
                      border={10}
                      color={'gray.800'}
                      _placeholder={{
                        color: 'gray.500'
                      }}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <Textarea
                      value={jobDesc}
                      onChange={(e) => setDesc(e.target.value)}
                      name="description"
                      type="text"
                      placeholder="Deskripsi Pekerjaan"
                      fontWeight={'light'}
                      bg={'#D9D9D9'}
                      border={10}
                      color={'gray.800'}
                      _placeholder={{
                        color: 'gray.500'
                      }}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <Input
                      value={jobLocation}
                      onChange={(e) => setLocation(e.target.value)}
                      name="location"
                      type="text"
                      placeholder="Lokasi, contoh : Medan, Indonesia"
                      fontWeight={'light'}
                      bg={'#D9D9D9'}
                      border={10}
                      color={'gray.800'}
                      _placeholder={{
                        color: 'gray.500'
                      }}
                    />
                  </FormControl>
                  <Stack align={'center'} direction={'row'}>
                    <FormControl isRequired>
                      <Select
                        value={jobCategory}
                        onChange={(e) => setCategory(e.target.value)}
                        variant={'filled'}
                        placeholder="Kategori :"
                        bgColor={'#D9D9D9'}
                        fontWeight={'light'}
                        border={10}
                        color={'gray.800'}
                        name="gender"
                      >
                        <option value="Information">Information</option>
                        <option value="Technology">Technology</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Finance">Finance</option>
                        <option value="Education">Education</option>
                        <option value="Sales">Sales</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Customer_Service">
                          Customer Service
                        </option>
                        <option value="Human_Resources">Human Resources</option>
                        <option value="Energy">Energy</option>
                        <option value="Food">Food</option>
                        <option value="Automotive">Automotive</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Construction">Construction</option>
                      </Select>
                    </FormControl>
                    <FormControl isRequired>
                      <Select
                        value={jobType}
                        onChange={(e) => setType(e.target.value)}
                        variant={'filled'}
                        placeholder="Tipe :"
                        bgColor={'#D9D9D9'}
                        fontWeight={'light'}
                        border={10}
                        color={'gray.800'}
                        name="gender"
                      >
                        <option value="WFH">Work From Home (WFH)</option>
                        <option value="WFO">Work From Office (WFO)</option>
                      </Select>
                    </FormControl>
                  </Stack>
                  <Stack align={'center'} direction={'row'}>
                    <FormControl isRequired>
                      <Input
                        value={jobCapacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        name="capacity"
                        type="number"
                        fontWeight={'light'}
                        placeholder="Kapasitas"
                        bg={'#D9D9D9'}
                        border={10}
                        color={'gray.800'}
                        _placeholder={{
                          color: 'gray.500'
                        }}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <Input
                        value={jobSalary}
                        onChange={(e) => setSalary(e.target.value)}
                        name="salary"
                        type="number"
                        fontWeight={'light'}
                        placeholder="Gaji, contoh : 5000000"
                        bg={'#D9D9D9'}
                        border={10}
                        color={'gray.800'}
                        _placeholder={{
                          color: 'gray.500'
                        }}
                      />
                    </FormControl>
                  </Stack>
                  <Stack
                    align={'center'}
                    direction={{ base: 'column', md: 'row' }}
                  >
                    <Flex w={'100%'}>
                      <Text px={'5%'}>Batas Pendaftaran :</Text>
                    </Flex>
                    <FormControl isRequired>
                      <Input
                        value={closeDate}
                        onChange={(e) => setCloseDate(e.target.value)}
                        name="close_date"
                        type="date"
                        fontWeight={'light'}
                        bg={'#D9D9D9'}
                        border={10}
                        color={'gray.800'}
                        _placeholder={{
                          color: 'gray.500'
                        }}
                      />
                    </FormControl>
                  </Stack>
                  <FormControl isRequired>
                    <Textarea
                      value={jobDo}
                      onChange={(e) => setJobDo(e.target.value)}
                      placeholder="Hal yang dikerjakan, contoh : - Design and test renewable energy systems"
                      rows="5"
                      fontWeight={'light'}
                      bg={'#D9D9D9'}
                      border={10}
                      color={'gray.800'}
                      _placeholder={{
                        color: 'gray.500'
                      }}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <Textarea
                      value={jobNeed}
                      onChange={(e) => setJobNeed(e.target.value)}
                      placeholder="Persyaratan, contoh : -  Degree in Engineering"
                      rows="5"
                      fontWeight={'light'}
                      bg={'#D9D9D9'}
                      border={10}
                      color={'gray.800'}
                      _placeholder={{
                        color: 'gray.500'
                      }}
                    />
                  </FormControl>
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
                  Tambahkan
                </Button>
              </Box>
            </form>
          </Stack>
        </Flex>
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
      </Stack>
    </Box>
  );
}
