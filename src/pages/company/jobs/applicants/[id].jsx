import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import {
  getApllicants,
  getJobById,
  updateStatusApplicants
} from '@/modules/fetch';
import {
  Box,
  Button,
  Card,
  ChakraProvider,
  Flex,
  Image,
  Link,
  Select,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import customTheme from '@/styles/theme';
import { validateToken } from '@/hooks/tokenValidation';

export default function JobById() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [statusMap, setStatusMap] = useState({});
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

  const handleSelectChange = async (event, applicantId) => {
    const newStatusMap = { ...statusMap, [applicantId]: event.target.value };
    const isConfirmed = window.confirm(
      `Apakah Anda yakin mengubah status ini menjadi ${event.target.value}?`
    );

    if (isConfirmed) {
      try {
        await updateStatusApplicants(id, event.target.value, applicantId);
        setStatusMap(newStatusMap);
      } catch (e) {
        console.error(e);
      }
    }
  };
  const getGenderLabel = (gender) => {
    return gender === 'M'
      ? 'Pria'
      : gender === 'F'
        ? 'Wanita'
        : 'Tidak Diketahui';
  };

  useEffect(() => {
    const fetchDataJob = async () => {
      try {
        const companyJob = await getJobById(id);
        setJob(companyJob.data);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };

    const fetchDataAplicants = async () => {
      try {
        if (id) {
          const response = await getApllicants(id);
          setApplicants(response.data);
          const initialStatusMap = response.data.reduce((map, applicant) => {
            map[applicant.jobseekers_id] = applicant.status;
            return map;
          }, {});
          setStatusMap(initialStatusMap);
        }
      } catch (e) {
        setLoading(false);
      }
    };

    if (id) {
      fetchDataJob();
      fetchDataAplicants();
    }
    setLoading(false);
  }, [id]);

  return (
    <ChakraProvider theme={customTheme}>
      {isLoading ? (
        <Skeleton height="300px" my="6" />
      ) : (
        <>
          <Navbar></Navbar>
          <Box mt={70} p={5}>
            <Card bg="#F5F5F5" rounded="10" boxShadow="lg" p={3}>
              <Link href={`/company/jobs/${userId}`}>
                <Image
                  src="/company-profile/job/detail/back.png"
                  _hover={{ transform: 'scale(1.2)' }}
                />
              </Link>
              {/* Header Start */}
              <Text fontSize="35px" fontWeight="bold" px="10px" mt={10}>
                Data Pelamar Pekerjaan
              </Text>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                px="10px"
              >
                <Stack>
                  <Flex p={2} alignItems="center" gap="8rem">
                    <Stack>
                      <Text fontSize="29px" fontWeight="bold">
                        {job.name}
                      </Text>
                      <Text fontSize="17px" fontWeight="bold">
                        {job.category}
                      </Text>
                    </Stack>
                    <Stack>
                      <ImageAndTeksInline image="/company-profile/location.png">
                        {job.location}
                      </ImageAndTeksInline>
                      <ImageAndTeksInline image="/company-profile/job/detail/gaji.png">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR'
                        })
                          .format(parseFloat(job.salary).toFixed(0))
                          .replace(',00', '')}
                      </ImageAndTeksInline>
                    </Stack>
                    <Stack>
                      <ImageAndTeksInline image="/company-profile/job/detail/type.png">
                        {job.job_type}
                      </ImageAndTeksInline>
                      <ImageAndTeksInline image="/company-profile/job/detail/kuota.png">
                        {job.capacity} orang
                      </ImageAndTeksInline>
                    </Stack>
                  </Flex>
                </Stack>
                <Flex
                  justifyContent="center"
                  flexDirection="column"
                  alignItems="center"
                  bg="#0B1A2A"
                  rounded="10px"
                  p={7}
                >
                  <Text color="#C0C0C0" fontSize="21px" fontWeight="normal">
                    Jumlah Pelamar Pekerjaan
                  </Text>
                  <Text color="white" fontSize="30px" fontWeight="bold">
                    {applicants.length} Pelamar
                  </Text>
                </Flex>
              </Flex>
              {/* Header end */}

              {/* Table start */}

              <TableContainer rounded="10px" my="10px" py="50px" px="10px">
                <Table>
                  <Thead bg="#D9D9D9">
                    <Tr>
                      <TheadData>Nama Lengkap</TheadData>
                      <TheadData>Umur</TheadData>
                      <TheadData>Jenis Kelamin</TheadData>
                      <TheadData>Alamat</TheadData>
                      <TheadData>Nomor Telepon</TheadData>
                      <TheadData>CV</TheadData>
                      <TheadData>Portofolio</TheadData>
                      <TheadData>Aksi</TheadData>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {applicants && applicants.length === 0 ? (
                      <Tr>
                        <TbodyData
                          colSpan="8"
                          textAlign="center"
                          fontSize="20px"
                        >
                          Belum ada yang melamar pekerjaan ini
                        </TbodyData>
                      </Tr>
                    ) : (
                      applicants.map((applicant) => (
                        <Tr key={applicant.jobseekers_id}>
                          <TbodyData>{applicant.jobseeker_name}</TbodyData>
                          <TbodyData>{applicant.age}</TbodyData>
                          <TbodyData>
                            {getGenderLabel(applicant.gender)}
                          </TbodyData>
                          <TbodyData>{applicant.jobseeker_address}</TbodyData>
                          <TbodyData>{applicant.phone_number}</TbodyData>
                          <TbodyData>
                            <Link
                              color="#2A5C91"
                              href={`http://localhost:3000/api/v1/${applicant.cv_jobseeker}`}
                            >
                              Link CV
                            </Link>
                          </TbodyData>
                          <TbodyData>
                            <Link color="#2A5C91" href="#">
                              Link portofolio
                            </Link>
                          </TbodyData>
                          <TbodyData>
                            <Flex gap={3}>
                              <Link
                                href={`https://wa.me/${applicant.phone_number}`}
                                target="_blank"
                              >
                                <Button bg="#459B72" color="white">
                                  Chat
                                </Button>
                              </Link>

                              <Select
                                minWidth="100px"
                                p="0"
                                fontSize="12px"
                                fontWeight="bold"
                                color="black"
                                placeholder="Move To"
                                defaultValue={
                                  statusMap[applicant.jobseekers_id] ||
                                  'pending'
                                }
                                onChange={(event) =>
                                  handleSelectChange(
                                    event,
                                    applicant.jobseekers_id
                                  )
                                }
                                textColor="black"
                                bg={
                                  statusMap[applicant.jobseekers_id] ===
                                    'rejected' ||
                                  statusMap[applicant.jobseekers_id] ===
                                    'cancel'
                                    ? 'red'
                                    : statusMap[applicant.jobseekers_id] ===
                                        'accepted'
                                      ? 'green'
                                      : statusMap[applicant.jobseekers_id] ===
                                          'interview'
                                        ? 'blue'
                                        : 'white'
                                }
                                isDisabled={
                                  statusMap[applicant.jobseekers_id] ===
                                    'rejected' ||
                                  statusMap[applicant.jobseekers_id] ===
                                    'accepted' ||
                                  statusMap[applicant.jobseekers_id] ===
                                    'cancel'
                                }
                              >
                                <option
                                  value="interview"
                                  style={{
                                    backgroundColor: 'blue',
                                    color: 'white'
                                  }}
                                >
                                  interview
                                </option>
                                <option
                                  value="accepted"
                                  style={{
                                    backgroundColor: 'green',
                                    color: 'white'
                                  }}
                                >
                                  Accepted
                                </option>
                                <option
                                  value="rejected"
                                  style={{
                                    backgroundColor: 'red',
                                    color: 'white'
                                  }}
                                >
                                  rejected
                                </option>
                              </Select>
                            </Flex>
                          </TbodyData>
                        </Tr>
                      ))
                    )}
                  </Tbody>
                </Table>
              </TableContainer>

              {/* Table End */}
            </Card>
          </Box>
          <Footer />
        </>
      )}
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

const TheadData = (props) => {
  const { children } = props;
  return (
    <Th
      color="#0B1A2A"
      fontWeight="bold"
      fontSize="14px"
      border="1px solid #9DA1A6"
    >
      {children}
    </Th>
  );
};

const TbodyData = (props) => {
  const { children } = props;
  return (
    <Td border="1px solid #9DA1A6" fontSize="15px">
      {children}
    </Td>
  );
};
