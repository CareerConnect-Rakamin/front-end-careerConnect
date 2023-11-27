import {
  Button,
  Flex,
  Text,
  Heading,
  Stack,
  Box,
  useToast,
  VStack,
  Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Skeleton
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import {
  cancelApply,
  createApply,
  getApply,
  getJobById,
  getUserById
} from '@/modules/fetch';
import Navbar from '@/components/Navbar';

export default function DetailsJob() {
  const [job, setJob] = useState('');
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isApply, setApply] = useState(false);
  const [isCancel, setCancel] = useState(false);
  const [isProcess, setProcess] = useState(false);
  const [isInterview, setInterview] = useState(false);
  const [isAccepted, setAccepted] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isCompany, setCompany] = useState(false);
  const [isOwner, setOwner] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;
  const formattedSalary = `${Number(job.salary).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserById();
        const response = await getJobById(id);
        if (user.data.role === 'company') {
          setCompany(true);
        }
        if (
          user.data.role === 'company' &&
          response.data.companies_id === user.data.id
        ) {
          setOwner(true);
        }
      } catch (e) {
        if (e.message == 401) {
          window.localStorage.removeItem('token');
          setAuthenticated(false);
        }
        console.log(e);
      }
    };

    const fetchJob = async () => {
      try {
        const response = await getJobById(id);
        const token = localStorage.getItem('token');
        if (token) {
          setAuthenticated(true);
        }
        setJob(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchApply = async () => {
      try {
        const apply = await getApply(id);
        if (apply) {
          setApply(true);
        }

        if (apply.data[0].status === 'cancel') {
          setCancel(true);
        }

        if (apply.data[0].status === 'interview') {
          setInterview(true);
          setProcess(true);
        }

        if (apply.data[0].status === 'accepted') {
          setAccepted(true);
          setProcess(true);
        }

        if (apply.data[0].status === 'rejected') {
          setProcess(true);
        }
      } catch (e) {
        console.log('Lowongan Pekerjaan belum diApply!');
      }
    };

    fetchUser();
    fetchJob();
    fetchApply();
  }, [id]);

  const successToast = () => {
    toast({
      title: 'Success',
      description: 'You have successfully apply.',
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
          Lamaran berhasil dikirim.
        </Box>
      )
    });
  };

  const cancelToast = () => {
    toast({
      title: 'Cancel',
      description: 'You have canceled apply.',
      status: 'cancel',
      duration: 3000,
      isClosable: true,
      position: 'top-center',
      render: () => (
        <Box
          textAlign={'center'}
          borderRadius={20}
          color="white"
          p={3}
          bg="yellow.500"
        >
          Lamaran pekerjaan dibatalkan.
        </Box>
      )
    });
  };

  const directToast = () => {
    toast({
      title: 'Passed',
      description: 'You must login or register first.',
      status: 'passed',
      duration: 3000,
      isClosable: true,
      position: 'top-center',
      render: () => (
        <Box
          textAlign={'center'}
          borderRadius={20}
          color="white"
          p={3}
          bg="yellow.500"
        >
          Anda harus login terlebih dahulu.
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

  const applyJobHandler = async () => {
    try {
      await createApply(id);
      successToast();
      setApply(true);
    } catch (err) {
      errorToast(err);
    }
  };

  const cancelJobHandler = async () => {
    try {
      await cancelApply(id);
      cancelToast();
      setCancel(true);
    } catch (err) {
      errorToast(err);
    }
  };

  const directHandler = async () => {
    directToast();
    router.push('/auth/login');
  };

  return (
    <VStack spacing={0} bgColor={'custom.soft_grey'} minH="100vh" w="100%">
      <Head>
        <title>Details</title>
      </Head>
      <Navbar />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        {isApply ? (
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Batalkan Lamar Pekerjaan
              </AlertDialogHeader>

              <AlertDialogBody>
                Apakah anda yakin membatalkan lamaran pekerjaan ini? Setelah
                membatalkan lamaran, anda tidak dapat melamar pekerjaan ini
                lagi.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  color={'white'}
                  colorScheme={'yellow'}
                  ref={cancelRef}
                  onClick={onClose}
                >
                  kembali
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    cancelJobHandler();
                    onClose();
                  }}
                  ml={3}
                >
                  Batalkan lamaran
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        ) : (
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Lamar Pekerjaan
              </AlertDialogHeader>

              <AlertDialogBody>
                Apakah anda yakin melamar pekerjaan ini?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button colorScheme={'red'} ref={cancelRef} onClick={onClose}>
                  Batal
                </Button>
                <Button
                  colorScheme="green"
                  onClick={() => {
                    applyJobHandler();
                    onClose();
                  }}
                  ml={3}
                >
                  Lamar sekarang
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        )}
      </AlertDialog>
      <Stack
        pt={'5%'}
        w={'100%'}
        bgColor={'white'}
        minH={'40vh'}
        direction={{ base: 'column', md: 'row' }}
      >
        <Flex flex={4} align={'center'} justify={'center'} direction={'row'}>
          {isLoading ? (
            <Skeleton height="300px" my="6" />
          ) : (
            <Stack
              align={'center'}
              justify={'center'}
              spacing={{ base: '50px' }}
              direction={{ base: 'column', md: 'row' }}
            >
              <Image
                src={`http://localhost:3000/api/v1/${job.company_photo}`}
                alt="Company Logo"
                maxW={'100px'}
                noOfLines={2}
              />
              <Stack spacing={1} textAlign={'start'} fontFamily={'lexendDeca'}>
                <Heading
                  color={'custom.dark_blue'}
                  fontSize={{ base: '22px', md: '24px', lg: '26px' }}
                >
                  {job.name}
                </Heading>
                <Text
                  color={'custom.blue'}
                  fontWeight={500}
                  fontSize={{ base: '14px', md: '15px', lg: '16px' }}
                >
                  {job.company_name}
                </Text>
                <Text
                  color={'custom.blue'}
                  fontWeight={500}
                  fontSize={{ base: '14px', md: '15px', lg: '16px' }}
                >
                  {job.name}
                </Text>
              </Stack>
            </Stack>
          )}
        </Flex>
        {isCompany ? (
          isOwner ? (
            <Flex
              flex={4}
              align={'center'}
              justify={'center'}
              direction={'column'}
            >
              <Button
                onClick={() => {
                  isAuthenticated ? onOpen() : directHandler();
                }}
                size={{ base: 'xs', md: 'sm', lg: 'md' }}
                borderRadius={10}
                fontFamily={'lexendDeca'}
                m={2}
                bg={'orange.300'}
                color={'white'}
                fontSize={{ base: '16px', md: '16px', lg: '18px' }}
                _hover={{
                  bg: '#2a5c91',
                  transform: 'scale(1.05)'
                }}
              >
                Edit Pekerjaan
              </Button>
            </Flex>
          ) : (
            <Flex
              flex={4}
              align={'center'}
              justify={'center'}
              direction={'column'}
            ></Flex>
          )
        ) : (
          <Flex
            flex={4}
            align={'center'}
            justify={'center'}
            direction={'column'}
          >
            {isApply ? (
              isCancel ? (
                <Button
                  size={{ base: 'xs', md: 'sm', lg: 'md' }}
                  borderRadius={10}
                  fontFamily={'lexendDeca'}
                  m={2}
                  bg={'gray.300'}
                  color={'white'}
                  fontSize={{ base: '16px', md: '16px', lg: '18px' }}
                >
                  Lamaran Dibatalkan
                </Button>
              ) : isProcess ? (
                <Button
                  size={{ base: 'xs', md: 'sm', lg: 'md' }}
                  borderRadius={10}
                  fontFamily={'lexendDeca'}
                  m={2}
                  bg={
                    isInterview
                      ? 'orange.300'
                      : isAccepted
                        ? 'green.300'
                        : 'red.300'
                  }
                  color={'white'}
                  fontSize={{ base: '16px', md: '16px', lg: '18px' }}
                >
                  {isInterview
                    ? 'Interview'
                    : isAccepted
                      ? 'Diterima'
                      : 'Ditolak'}
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    isAuthenticated ? onOpen() : directHandler();
                  }}
                  size={{ base: 'xs', md: 'sm', lg: 'md' }}
                  borderRadius={10}
                  fontFamily={'lexendDeca'}
                  m={2}
                  bg={'red.300'}
                  color={'white'}
                  fontSize={{ base: '16px', md: '16px', lg: '18px' }}
                  _hover={{
                    bg: '#2a5c91',
                    transform: 'scale(1.05)'
                  }}
                >
                  Batalkan Lamaran
                </Button>
              )
            ) : (
              <Button
                onClick={() => {
                  isAuthenticated ? onOpen() : directHandler();
                }}
                size={{ base: 'xs', md: 'sm', lg: 'md' }}
                borderRadius={10}
                fontFamily={'lexendDeca'}
                m={2}
                bg={'orange.300'}
                color={'white'}
                fontSize={{ base: '16px', md: '16px', lg: '18px' }}
                _hover={{
                  bg: '#2a5c91',
                  transform: 'scale(1.05)'
                }}
              >
                Lamar Sekarang
              </Button>
            )}
            <Text
              color={'custom.blue'}
              fontWeight={500}
              fontSize={{ base: '12px', md: '13px', lg: '14px' }}
            >
              Batas 12 desember 2023
            </Text>
          </Flex>
        )}
      </Stack>
      <Stack
        align={'start'}
        justify={'space-evenly'}
        w={'100%'}
        p={{ base: '30px', md: '35px', lg: '40px' }}
        spacing={{ base: '50px' }}
        minH={'60vh'}
        direction={{ base: 'column', md: 'row' }}
      >
        <Flex
          p={8}
          minH={'50vh'}
          flex={4}
          borderRadius={7}
          bgColor={'white'}
          align={'start'}
          justify={'center'}
          direction={'column'}
        >
          <Stack spacing={8}>
            <Stack
              gap={5}
              spacing={1}
              textAlign={'start'}
              fontFamily={'lexendDeca'}
            >
              <Heading
                color={'custom.blue'}
                fontSize={{ base: '20px', md: '22px', lg: '24px' }}
              >
                Job Description
              </Heading>
              <Text
                fontWeight={500}
                fontSize={{ base: '13px', md: '14px', lg: '15px' }}
              >
                {job.what_will_you_do}
              </Text>
              ;
            </Stack>
            <Stack spacing={1} textAlign={'start'} fontFamily={'lexendDeca'}>
              <Heading
                color={'custom.blue'}
                fontSize={{ base: '20px', md: '22px', lg: '24px' }}
              >
                Job Requirements
              </Heading>
              <Stack spacing={1}>
                <Text
                  fontWeight={500}
                  fontSize={{ base: '13px', md: '14px', lg: '15px' }}
                >
                  {job.what_will_you_need}
                </Text>
                ;
              </Stack>
            </Stack>
            <Stack w={'100%'} align={'end'} justify={'right'} direction={'row'}>
              {isApply ? (
                isCancel ? (
                  <Button
                    size={{ base: 'xs', md: 'sm', lg: 'md' }}
                    borderRadius={10}
                    fontFamily={'lexendDeca'}
                    m={2}
                    bg={'gray.300'}
                    color={'white'}
                    fontSize={{ base: '16px', md: '16px', lg: '18px' }}
                  >
                    Lamaran Dibatalkan
                  </Button>
                ) : isProcess ? (
                  <Button
                    size={{ base: 'xs', md: 'sm', lg: 'md' }}
                    borderRadius={10}
                    fontFamily={'lexendDeca'}
                    m={2}
                    bg={
                      isInterview
                        ? 'orange.300'
                        : isAccepted
                          ? 'green.300'
                          : 'red.300'
                    }
                    color={'white'}
                    fontSize={{ base: '16px', md: '16px', lg: '18px' }}
                  >
                    {isInterview
                      ? 'Interview'
                      : isAccepted
                        ? 'Diterima'
                        : 'Ditolak'}
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      isAuthenticated ? onOpen() : directHandler();
                    }}
                    size={{ base: 'xs', md: 'sm', lg: 'md' }}
                    borderRadius={10}
                    fontFamily={'lexendDeca'}
                    m={2}
                    bg={'red.300'}
                    color={'white'}
                    fontSize={{ base: '16px', md: '16px', lg: '18px' }}
                    _hover={{
                      bg: '#2a5c91',
                      transform: 'scale(1.05)'
                    }}
                  >
                    Batalkan Lamaran
                  </Button>
                )
              ) : (
                <Button
                  onClick={() => {
                    isAuthenticated ? onOpen() : directHandler();
                  }}
                  size={{ base: 'xs', md: 'sm', lg: 'md' }}
                  borderRadius={10}
                  fontFamily={'lexendDeca'}
                  m={2}
                  bg={'orange.300'}
                  color={'white'}
                  fontSize={{ base: '16px', md: '16px', lg: '18px' }}
                  _hover={{
                    bg: '#2a5c91',
                    transform: 'scale(1.05)'
                  }}
                >
                  Lamar Sekarang
                </Button>
              )}
            </Stack>
          </Stack>
        </Flex>
        <Flex
          p={8}
          minH={'50vh'}
          flex={2}
          borderRadius={7}
          bgColor={'white'}
          align={'center'}
          justify={'space-evenly'}
          direction={'column'}
        >
          {isLoading ? (
            <Skeleton height="300px" my="6" />
          ) : (
            <Stack
              w={'100%'}
              align={'center'}
              justify={'space-evenly'}
              spacing={{ base: '30px' }}
            >
              <Stack
                w={'100%'}
                align={'center'}
                justify={'space-evenly'}
                spacing={{ base: '30px' }}
                direction={{ base: 'row' }}
              >
                <Image
                  src={`http://localhost:3000/api/v1/${job.company_photo}`}
                  alt="Company Logo"
                  maxW={'75px'}
                  noOfLines={2}
                />
                <Stack
                  spacing={1}
                  textAlign={'start'}
                  fontFamily={'lexendDeca'}
                >
                  <Text
                    color={'custom.blue'}
                    fontWeight={500}
                    fontSize={{ base: '14px', md: '15px', lg: '16px' }}
                  >
                    {job.company_name}
                  </Text>
                  <Heading
                    color={'custom.dark_blue'}
                    fontSize={{ base: '16px', md: '18px', lg: '20px' }}
                  >
                    Magang
                  </Heading>
                </Stack>
              </Stack>
              <Stack
                px={'10%'}
                w={'100%'}
                align={'start'}
                spacing={{ base: '30px' }}
                fontFamily={'lexendDeca'}
              >
                <Heading
                  color={'custom.dark_blue'}
                  fontSize={{ base: '22px', md: '24px', lg: '26px' }}
                >
                  {job.name}
                </Heading>
              </Stack>
              <Stack
                w={'100%'}
                align={'center'}
                justify={'space-around'}
                spacing={{ base: '30px' }}
                direction={{ base: 'row' }}
              >
                <Flex
                  direction={'column'}
                  spacing={1}
                  textAlign={'start'}
                  fontFamily={'lexendDeca'}
                >
                  <Heading
                    color={'custom.dark_blue'}
                    fontSize={{ base: '14px', md: '16px', lg: '18px' }}
                  >
                    Lokasi :
                  </Heading>
                  <Text
                    color={'custom.blue'}
                    fontWeight={500}
                    fontSize={{ base: '12px', md: '13px', lg: '14px' }}
                  >
                    {job.location}
                  </Text>
                </Flex>
                <Flex
                  direction={'column'}
                  spacing={1}
                  textAlign={'start'}
                  fontFamily={'lexendDeca'}
                >
                  <Heading
                    color={'custom.dark_blue'}
                    fontSize={{ base: '14px', md: '16px', lg: '18px' }}
                  >
                    Gaji :
                  </Heading>
                  <Text
                    color={'custom.blue'}
                    fontWeight={500}
                    fontSize={{ base: '12px', md: '13px', lg: '14px' }}
                  >
                    {formattedSalary}
                  </Text>
                </Flex>
              </Stack>
              <Stack
                px={'10%'}
                w={'100%'}
                align={'start'}
                spacing={1}
                fontFamily={'lexendDeca'}
              >
                <Heading
                  color={'custom.dark_blue'}
                  fontSize={{ base: '14px', md: '16px', lg: '18px' }}
                >
                  Batas Pendaftaran
                </Heading>
                <Text
                  color={'custom.blue'}
                  fontWeight={500}
                  fontSize={{ base: '12px', md: '13px', lg: '14px' }}
                >
                  12 desember 2023
                </Text>
              </Stack>
              <Stack
                px={'10%'}
                w={'100%'}
                align={'start'}
                spacing={1}
                fontFamily={'lexendDeca'}
              >
                <Heading
                  color={'custom.dark_blue'}
                  fontSize={{ base: '14px', md: '16px', lg: '18px' }}
                >
                  Deskripsi Perusahaan
                </Heading>
                <Text
                  color={'custom.blue'}
                  fontWeight={500}
                  fontSize={{ base: '12px', md: '13px', lg: '14px' }}
                >
                  {job.description}
                </Text>
              </Stack>
            </Stack>
          )}
        </Flex>
      </Stack>
    </VStack>
  );
}
