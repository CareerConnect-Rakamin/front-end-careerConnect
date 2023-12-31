import {
  Box,
  VStack,
  Text,
  Image,
  HStack,
  Flex,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useToast
} from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GetApplyJobs, GetProfileById, cancelApply } from '@/modules/fetch';
import Sidebar from '@/components/SidebarJobseeker';
import Head from 'next/head';
import { validateToken } from '@/hooks/tokenValidation';

const baseURL = process.env.API_URL || 'http://localhost:3000/api/v1';

const JobsStatus = () => {
  const router = useRouter();
  const toast = useToast();
  const [dataProfile, setDataProfile] = useState(null);
  const [dataJobs, setDataJobs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const id = router.query.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const profileResponse = await GetProfileById(id);
          setDataProfile(profileResponse.data.dataProfile);
        }

        const jobsResponse = await GetApplyJobs();
        setDataJobs(jobsResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        // Set loading to false once data fetching is complete
        setIsLoading(false);
      }
    };
    const checkToken = () => {
      const idUser = id;
      if (idUser) {
        const result = validateToken();
        const { id, role } = result;
        const idToken = id;
        if (idToken != idUser) {
          router.push(`/`);
        }
      }
    };
    fetchData();
    checkToken();
  }, [id]);

  const cancelJob = async (jobId) => {
    console.log(jobId);
    try {
      const response = await cancelApply(jobId);
      if (response) {
        toast({
          title: 'success',
          description: 'Data apply pekerjaan berhasil dibatalkan.',
          status: 'success',
          position: 'top',
          duration: 5000,
          isClosable: true
        });

        setTimeout(() => {
          router.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Head>
        <title>Data Apply Jobs</title>
      </Head>
      <Navbar />
      <Flex mb={10} pt={'5em'}>
        {dataProfile && <Sidebar dataUser={dataProfile} />}
        <Box
          fontFamily={'lexendDeca'}
          m={6}
          w="50.813rem"
          bg="gray.50"
          borderRadius="lg"
          boxShadow={'lg'}
        >
          <VStack align={'center'} mt={5}>
            <Text fontSize={'2xl'} fontWeight={'bold'}>
              Data Apply Pekerjaan Pengguna
            </Text>
          </VStack>
          <VStack align={'center'} my={5}>
            {dataJobs?.map((jobs) => {
              console.log(jobs?.jobs_id);
              return (
                <>
                  <Box
                    key={jobs.jobs_id}
                    bgColor={'gray.100'}
                    w={'43.75rem'}
                    borderRadius={'xl'}
                    boxShadow={'xl'}
                    transition={'0.3s'}
                    _hover={{
                      bgColor: 'blue.100'
                    }}
                    mb={'1em'}
                  >
                    <HStack>
                      <Image
                        alt={jobs.company_name}
                        src={`${baseURL}/${jobs.company_photo}`}
                        w={'100px'}
                        borderRadius={'10px'}
                        mx={4}
                      />
                      <VStack gap={0} align={'left'} w={'40%'}>
                        <Text fontSize={'lg'} fontWeight={'bold'} mt={'0.5em'}>
                          {jobs.company_name}
                        </Text>
                        <Text fontSize={'2xl'} fontWeight={'bold'}>
                          {jobs.job_name}
                        </Text>
                        <Text mb={'0.5em'}>{jobs.location}</Text>
                      </VStack>
                      <VStack ml={'auto'} mr={'1em'}>
                        <Text
                          mt={'1em'}
                          py={'0.5em'}
                          px={'1em'}
                          borderRadius={'5px'}
                          ml={'auto'}
                          color={'#F5F5F5'}
                          bgColor={
                            jobs.status === 'pending'
                              ? 'gray.400'
                              : jobs.status === 'interview'
                                ? 'yellow.400'
                                : jobs.status === 'accepted'
                                  ? 'green.400'
                                  : 'red.400'
                          }
                          fontWeight={'bold'}
                          fontSize={'sm'}
                        >
                          Status :
                          {jobs.status === 'pending'
                            ? ' Diproses'
                            : jobs.status === 'interview'
                              ? ' Interview'
                              : jobs.status === 'accepted'
                                ? ' Diterima'
                                : jobs.status === 'cancel'
                                  ? ' Dibatalkan'
                                  : jobs.status === 'rejected'
                                    ? ' Ditolak'
                                    : ' Tidak Ada'}
                        </Text>
                        <HStack mb={'1em'}>
                          <Link href={`/jobs/details/${jobs.jobs_id}`}>
                            <Button
                              size={'sm'}
                              bgColor={'#2A5C91'}
                              color={'#F5F5F5'}
                              mt={'2em'}
                              _hover={{
                                bgColor: '#193a5c'
                              }}
                            >
                              Detail Lowongan
                            </Button>
                          </Link>
                          <Popover>
                            <PopoverTrigger>
                              <Button
                                size={'sm'}
                                colorScheme="red"
                                mt={'2em'}
                                display={
                                  jobs?.status === 'cancel' ? 'none' : 'block'
                                }
                              >
                                Batalkan
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <PopoverArrow />
                              <PopoverCloseButton />
                              <PopoverHeader>Konfirmasi!</PopoverHeader>
                              <PopoverBody>
                                Apakah anda yakin untuk membatalkan pekerjaan
                                ini?
                              </PopoverBody>
                              <Button
                                colorScheme="red"
                                onClick={() => cancelJob(jobs?.jobs_id)}
                              >
                                Batalkan
                              </Button>
                            </PopoverContent>
                          </Popover>
                        </HStack>
                      </VStack>
                    </HStack>
                  </Box>
                </>
              );
            })}
          </VStack>
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export default JobsStatus;
