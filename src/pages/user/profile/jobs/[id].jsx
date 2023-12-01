import {
  Box,
  VStack,
  Text,
  Image,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Center
} from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GetApplyJobs, GetProfileById } from '@/modules/fetch';
import Sidebar from '@/components/sidebar.jobseeker';

const baseURL = process.env.API_URL || 'http://localhost:3000/api/v1';

const JobsStatus = () => {
  const router = useRouter();
  const [dataProfile, setDataProfile] = useState(null);
  const [dataJobs, setDataJobs] = useState(null);
  const id = router.query.id;

  useEffect(() => {
    const getDataProfile = async () => {
      try {
        if (id) {
          console.log('id', id);
          const response = await GetProfileById(id);
          setDataProfile(response.data.dataProfile);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getDataJobs = async () => {
      try {
        const response = await GetApplyJobs();
        setDataJobs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDataJobs();
    getDataProfile();
  }, []);

  console.log('data', dataJobs);
  console.log('data profile', dataProfile);

  return (
    <>
      <Navbar />
      <Flex mb={10}>
        {dataProfile && <Sidebar dataUser={dataProfile} />}
        <Box
          fontFamily={'lexendDeca'}
          as="aside"
          mt="21px"
          ml="40px"
          w="50.813rem"
          bg="#F5F5F5"
          color="#0B1A2A"
          borderRadius="20px"
          pos={'static'}
          h="auto"
          boxShadow="7px 7px 5px rgba(0, 0, 0, 0.2)"
        >
          <VStack align={'center'} mt={'2em'}>
            <Text fontSize={'2xl'} fontWeight={'bold'}>
              Data Apply Pekerjaan Pengguna
            </Text>
          </VStack>
          <VStack align={'center'} mt={'3em'}>
            {dataJobs?.map((jobs) => {
              console.log(jobs.company_photo);
              return (
                <>
                  <Box
                    key={jobs.job_id}
                    bgColor={'#FFBA79'}
                    w={'43.75rem'}
                    borderRadius={'10px'}
                    boxShadow="5px 5px 4px rgba(0, 0, 0, 0.2)"
                    border="1px solid #000000"
                    _hover={{
                      bgColor: '#FFA959'
                    }}
                  >
                    <HStack>
                      <Image
                        alt={jobs.company_name}
                        src={`${baseURL}/${jobs.company_photo}`}
                        w={'100px'}
                        borderRadius={'10px'}
                        ml={'1em'}
                        mt={'1em'}
                        mb={'1em'}
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
                              ? '#969093'
                              : jobs.status === 'interview'
                                ? '#C7B941'
                                : jobs.status === 'accepted'
                                  ? '#459B72'
                                  : '#B72E2E'
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
                          <Link href={''}>
                            <Button
                              size={'sm'}
                              bgColor={'#2A5C91'}
                              color={'#F5F5F5'}
                              mt={'2em'}
                              _hover={{
                                bgColor: '#193a5c'
                              }}
                            >
                              Detail Perusahaan
                            </Button>
                            <Button
                              size={'sm'}
                              colorScheme="red"
                              mt={'2em'}
                              ml={'1em'}
                            >
                              Batalkan
                            </Button>
                          </Link>
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
    </>
  );
};

export default JobsStatus;
