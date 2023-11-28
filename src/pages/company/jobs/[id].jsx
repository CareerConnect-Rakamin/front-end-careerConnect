import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  ChakraProvider,
  Flex,
  Grid,
  GridItem,
  Image,
  Link,
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

export default function CompanyJobs() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState([]);
  const [applicants, setApplicants] = useState();
  const [isLoading, setLoading] = useState(true);
  const [statusJob, setStatusJob] = useState({});
  const toast = useToast();
  const { id } = router.query;

  useEffect(() => {
    const fetchDataCompany = async () => {
      const response = await getCompanyById(id);
      setCompany(response.data);
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
      // Handle error jika terjadi kesalahan saat menutup lowongan
      console.error(error);
    }
  }

  return (
    <ChakraProvider>
      <Navbar />

      <Grid
        templateAreas={`
          "side profile"`}
        gridTemplateRows={'full 1fr full'}
        gridTemplateColumns={'350px 1fr'} // Mengatur lebar kolom "side" menjadi sekitar 300
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
        mt={70}
        mb={0}
      >
        {/* Side Nav Start */}
        <GridItem p="5" pr={'10px'} area={'side'}>
          <Card bg={'#F5F5F5'} boxShadow="md" mx="auto" my="auto" h="400px">
            <CardHeader p={'10px'}>
              <Flex flexDirection="column" alignItems="center">
                <Image
                  src={`http://localhost:3000/api/v1/${company.photo_profile}`}
                  alt="photo.profile"
                  boxSize="125px"
                  borderRadius="10px"
                  objectFit="cover"
                />
                <Text mt={2}>Company Name</Text>
              </Flex>
            </CardHeader>
            <CardBody p={'10px'}>
              <Stack>
                <Text mt={2} textAlign="left">
                  Menu Utama
                </Text>
                <hr style={{ width: '75%', borderTop: '2px solid #2A5C91' }} />
                <ImageAndTeksInline image="/company-profile/dashboard.png">
                  <Link href={`/company/${id}`}>Dashboard Perusahaan</Link>
                </ImageAndTeksInline>
                <ImageAndTeksInline image="/company-profile/info-jobs.png">
                  <Link href="#">Data Lowongan Pekerjaan</Link>
                </ImageAndTeksInline>
                <ImageAndTeksInline image="/company-profile/add-jobs.png">
                  <Link href="#">Tambah Data Lowongan</Link>
                </ImageAndTeksInline>
              </Stack>
            </CardBody>
          </Card>
        </GridItem>
        {/* Side Nav End */}

        {/* Main Start */}
        <GridItem py="5" px="0" area={'profile'}>
          <Card bg="#F5F5F5" p="20px">
            <Text fontSize="30px" fontWeight="bold" mb="7">
              Data Lowongan Pekerjaan yang Terupload
            </Text>
            {jobs &&
              jobs.map((job) => (
                <Card
                  key={job.id}
                  bg={'#2A5C91'}
                  boxShadow="md"
                  p="20px"
                  my={3}
                >
                  <Flex>
                    <Stack w="280px">
                      <Text
                        fontSize="14px"
                        fontWeight="normal"
                        textColor="#C0C0C0"
                      >
                        Nama Pekerjaan
                      </Text>
                      <Text fontSize="30px" fontWeight="bold" textColor="white">
                        {job.name}
                      </Text>
                      <Text
                        fontSize="14px"
                        fontWeight="normal"
                        textColor="#C0C0C0"
                      >
                        Kategori Pekerjaan
                      </Text>
                      <Text fontSize="17px" fontWeight="bold" textColor="white">
                        {job.category}
                      </Text>
                    </Stack>
                    <Box
                      w="290px"
                      bg="#0B1A2A"
                      rounded="10"
                      px="25px"
                      py="20px"
                    >
                      <Flex gap={1}>
                        <Stack>
                          <ContentMid image="/company-profile/job/lokasi.png">
                            {job.location}
                          </ContentMid>
                          <ContentMid image="/company-profile/job/kuota.png">
                            {job.capacity} Orang
                          </ContentMid>
                          <Text
                            fontSize="12px"
                            fontWeight="normal"
                            color="#C0C0C0"
                          >
                            Data Pelamar Pekerjaan
                          </Text>
                          <Text fontSize="20px" fontWeight="bold" color="white">
                            {applicants &&
                              applicants[job.id] &&
                              applicants[job.id].length}
                          </Text>
                        </Stack>
                        <Stack mr={2}>
                          <ContentMid image="/company-profile/job/gaji.png">
                            {new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR'
                            })
                              .format(parseFloat(job.salary).toFixed(0))
                              .replace(',00', '')}
                          </ContentMid>
                          <ContentMid image="/company-profile/job/type.png">
                            {job.job_type}
                          </ContentMid>
                        </Stack>
                      </Flex>
                    </Box>
                    <Stack ml="50px">
                      <ContentRight
                        bg="#459B72"
                        color="white"
                        href={`/company/jobs/applicants/${job.id}`}
                      >
                        Lihat Data Pelamar
                      </ContentRight>
                      <ContentRight
                        bg="#FFBA79"
                        color="black"
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
                  </Flex>
                </Card>
              ))}
          </Card>
        </GridItem>
        {/* Main End */}
      </Grid>
    </ChakraProvider>
  );
}

const ImageAndTeksInline = (props) => {
  const {
    image,
    children,
    boxSize = '23px',
    fontSize = '18px',
    textColor = 'black'
  } = props;
  return (
    <Flex gap={2} alignItems="center">
      <Image src={image} boxSize={boxSize} />
      <Text fontSize={fontSize} fontWeight={'semibold'} textColor={textColor}>
        {children}
      </Text>
    </Flex>
  );
};

const ContentMid = (props) => {
  const { image, children } = props;
  return (
    <ImageAndTeksInline
      image={image}
      fontSize="15px"
      boxSize="25px"
      textColor="white"
    >
      {children}
    </ImageAndTeksInline>
  );
};

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
