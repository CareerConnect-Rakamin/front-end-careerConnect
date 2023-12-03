import {
  Box,
  Button,
  Card,
  ChakraProvider,
  Flex,
  Grid,
  GridItem,
  Image,
  Link,
  Skeleton,
  Stack,
  Text,
  useToast
} from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import {
  getApllicants,
  getCompanyById,
  getCompanyJobs,
  updateJob
} from '@/modules/fetch';
import { useEffect, useState } from 'react';
import customTheme from '@/styles/theme';
import SideBar from '@/components/company/Sidebar';
import { validateToken } from '@/hooks/tokenValidation';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { BsPersonWorkspace } from 'react-icons/bs';
import { IoPeople } from 'react-icons/io5';
import Head from 'next/head';

export default function CompanyJobs() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState([]);
  const [applicants, setApplicants] = useState();
  const [isLoading, setLoading] = useState(true);
  const [statusJob, setStatusJob] = useState({});
  const toast = useToast();
  const { id } = router.query;
  const [userId, setUserId] = useState();
  const [isTokenValid, setIsTokenValid] = useState(false);

  const checkToken = async () => {
    const result = await validateToken();
    const { id, role } = result;
    if (result) {
      setUserId(id);
      setIsTokenValid(true);
    } else {
      setIsTokenValid(false);
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken();
    }
  }, []);

  useEffect(() => {
    const fetchDataCompany = async () => {
      try {
        const response = await getCompanyById(id);
        setCompany(response.data);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    const fetchData = async () => {
      try {
        if (id) {
          const response = await getCompanyJobs(id);
          setJobs(response.data);
          const newStatusMap = response.data.reduce((acc, job) => {
            acc[job.id] = job.is_open; // Ini asumsi bahwa job.id dapat digunakan sebagai kunci unik
            return acc;
          }, {});

          setStatusJob(newStatusMap);
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    if (id) {
      fetchDataCompany();
      fetchData();
      setLoading(false);
    }
  }, [id]);

  // ...
  useEffect(() => {
    const fetchDataApplicants = async () => {
      try {
        if (jobs && jobs.length > 0) {
          const applicantsData = await Promise.all(
            jobs.map(async (job) => {
              try {
                const response = await getApllicants(job.id);
                return response.data;
              } catch (error) {
                return [];
              }
            })
          );

          setApplicants(
            applicantsData.reduce((acc, cur, idx) => {
              acc[jobs[idx].id] = cur;
              return acc;
            }, {})
          );
        }
      } catch (e) {
        setLoading(false);
      }
    };

    if (jobs && jobs.length > 0) {
      fetchDataApplicants();
    }
  }, [jobs]);

  async function closeJob(jobId) {
    try {
      const updatedJob = await updateJob(jobId, { is_open: false });
      const newStatusMap = { ...statusJob, [jobId]: false };
      setStatusJob(newStatusMap);

      toast({
        title: 'Success Close Job',
        description: 'Close Job successfully',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      console.error(error);
    }
  }
  async function openJob(jobId) {
    try {
      const updatedJob = await updateJob(jobId, { is_open: true });
      const newStatusMap = { ...statusJob, [jobId]: true };
      setStatusJob(newStatusMap);
      toast({
        title: 'Success Open Job',
        description: 'Open Job successfully',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ChakraProvider theme={customTheme}>
      <Head>
        <title>Job Vacancy Data</title>
      </Head>
      {isLoading ? (
        <Skeleton height="100%" my="6" />
      ) : (
        <>
          <Navbar />
          {id != userId || isTokenValid === false ? (
            <Flex mx={2} my="7rem" justifyContent="center">
              <MainCard
                jobs={jobs}
                applicants={applicants}
                statusJob={statusJob}
                userId={userId}
                id={id}
              />
            </Flex>
          ) : (
            <Grid
              templateAreas={`"side profile"`}
              gridTemplateRows={'full 1fr full'}
              gridTemplateColumns={'350px 1fr'}
              gap="1"
              color="blackAlpha.700"
              fontWeight="bold"
              mt={70}
              mb={0}
            >
              {/* Side Nav Start */}
              <GridItem p="5" pr={'10px'} area={'side'}>
                <SideBar
                  photoProfile={company.photo_profile}
                  companyName={company.name}
                />
              </GridItem>
              {/* Side Nav End */}

              {/* Main Start */}
              <GridItem py="5" px="0" area={'profile'}>
                <MainCard
                  jobs={jobs}
                  applicants={applicants}
                  statusJob={statusJob}
                  closeJob={closeJob}
                  openJob={openJob}
                />
              </GridItem>
              {/* Main End */}
            </Grid>
          )}
        </>
      )}
    </ChakraProvider>
  );
}

const ContentRight = (props) => {
  const { href = '#', children, bg, color } = props;
  return (
    <Link href={href}>
      <Button bg={bg} color={color} minW="220px">
        {children}
      </Button>
    </Link>
  );
};

const MainCard = (props) => {
  const { jobs, applicants, statusJob, closeJob, openJob, userId, id } = props;
  return (
    <Card bg="gray.50" p={3}>
      <Text fontSize="30px" fontWeight="bold" mb={2}>
        {id != userId || validateToken === false
          ? 'Pekerjaan Yang Ada di Company Ini'
          : 'Data Lowongan Pekerjaan yang Terupload'}
      </Text>
      {jobs &&
        jobs.map((job) => (
          <Card key={job.id} bg={'#2A5C91'} boxShadow="md" p="20px" my={3}>
            <Flex alignItems="center">
              <Stack w="280px">
                <Text fontSize="14px" fontWeight="normal" textColor="#e7e7e7">
                  Nama Pekerjaan
                </Text>
                <Text fontSize="xl" fontWeight="bold" textColor="white">
                  {job.name}
                </Text>
                <Text fontSize="14px" fontWeight="normal" textColor="#e7e7e7">
                  Kategori Pekerjaan
                </Text>
                <Text fontSize="lg" fontWeight="bold" textColor="white">
                  {job.category}
                </Text>
              </Stack>
              <Box w="290px" bg="#0B1A2A" rounded="10" px="25px" py="20px">
                <Flex gap={1}>
                  <Stack>
                    <Flex align={'center'} gap={2} color="white">
                      <FaLocationDot />
                      <Text noOfLines={1} fontWeight={'normal'}>
                        {job.location}
                      </Text>
                    </Flex>
                    <Flex align={'center'} gap={2} color="white">
                      <IoPeople />
                      <Text noOfLines={1} fontWeight={'normal'}>
                        {job.capacity} Lowongan
                      </Text>
                    </Flex>
                    {id == userId && (
                      <Flex align={'center'} gap={3}>
                        <Text fontSize="sm" fontWeight="normal" color="#C0C0C0">
                          Data Pelamar
                        </Text>
                        <Text fontSize="sm" fontWeight="bold" color="white">
                          {applicants &&
                            applicants[job.id] &&
                            applicants[job.id].length}
                        </Text>
                      </Flex>
                    )}
                  </Stack>
                  <Stack mr={2}>
                    <Flex align={'center'} color="white">
                      <MdOutlineAttachMoney />
                      <Text noOfLines={1} fontWeight={'normal'}>
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR'
                        })
                          .format(parseFloat(job.salary).toFixed(0))
                          .replace(',00', '')}
                      </Text>
                    </Flex>
                    <Flex align={'center'} gap={2} color="white">
                      <BsPersonWorkspace />
                      <Text fontWeight={'normal'}>{job.job_type}</Text>
                    </Flex>
                  </Stack>
                </Flex>
              </Box>
              {userId == id || validateToken === true ? (
                <Stack ml="50px">
                  <ContentRight
                    bg="#459B72"
                    color="white"
                    href={`/company/jobs/applicants/${job.id}`}
                  >
                    Lihat Data Pelamar
                  </ContentRight>
                  <ContentRight
                    bg="orange.300"
                    color="white"
                    href={`update/${job.id}`}
                  >
                    Ubah Data Lowongan
                  </ContentRight>
                  {statusJob[job.id] === true ? (
                    <Button
                      bg="#B72E2E"
                      color="white"
                      onClick={() => closeJob(job.id)}
                    >
                      Tutup Lowongan
                    </Button>
                  ) : (
                    <Button
                      bg="blue"
                      color="white"
                      onClick={() => openJob(job.id)}
                    >
                      Buka kembali lowongan
                    </Button>
                  )}
                </Stack>
              ) : (
                <Link ml="50px">
                  <ContentRight
                    bg="#459B72"
                    color="white"
                    href={`/jobs/details/${job.id}`}
                  >
                    Lihat Detail
                  </ContentRight>
                </Link>
              )}
            </Flex>
          </Card>
        ))}
    </Card>
  );
};
