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

const token =
  typeof window !== 'undefined' ? localStorage.getItem('token') : null;
console.log(token);
export default function JobById() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [statusMap, setStatusMap] = useState({});

  const handleSelectChange = async (event, applicantId) => {
    const newStatusMap = { ...statusMap, [applicantId]: event.target.value };
    const isConfirmed = window.confirm(
      `Apakah Anda yakin mengubah status ini menjadi ${event.target.value} untuk aplikasi dengan ID ${applicantId}?`
    );

    setStatusMap(newStatusMap);
    if (isConfirmed) {
      try {
        await updateStatusApplicants(id, event.target.value, applicantId);
        setStatusMap(newStatusMap);
      } catch (e) {
        console.error(e);
      }
    }
  };
  console.log(statusMap);
  const getGenderLabel = (gender) => {
    return gender === 'M'
      ? 'Pria'
      : gender === 'F'
        ? 'Wanita'
        : 'Tidak Diketahui';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const companyJob = await getJobById(id);
          const response = await getApllicants(id);
          setJob(companyJob.data);
          setApplicants(response.data);
          const initialStatusMap = response.data.reduce((map, applicant) => {
            map[applicant.jobseekers_id] = applicant.status;
            return map;
          }, {});

          setStatusMap(initialStatusMap);
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {});

  console.log(applicants);
  return (
    <ChakraProvider>
      <Navbar></Navbar>
      <Box mt={70} p={5}>
        <Card bg="#F5F5F5" rounded="10" boxShadow="lg" p={3}>
          <Link href={`/company/jobs/${id}`}>
            <Image
              src="/company-profile/job/detail/back.png"
              _hover={{ transform: 'scale(1.2)' }}
            />
          </Link>
          {/* Header Start */}
          <Text fontSize="35px" fontWeight="bold" px="10px" mt={10}>
            Data Pelamar Pekerjaan
          </Text>
          <Flex justifyContent="space-between" alignItems="center" px="10px">
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
                    {job.salary}
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
                {applicants &&
                  applicants.map((applicant) => (
                    <Tr key={applicant.jobseekers_id}>
                      <TbodyData>{applicant.jobseeker_name}</TbodyData>
                      <TbodyData>{applicant.age}</TbodyData>
                      <TbodyData>{getGenderLabel(applicant.gender)}</TbodyData>
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
                          <Link href="#">
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
                              statusMap[applicant.jobseekers_id] || 'pending'
                            }
                            onChange={(event) =>
                              handleSelectChange(event, applicant.jobseekers_id)
                            }
                            textColor="black"
                            bg={
                              statusMap[applicant.jobseekers_id] === 'rejected'
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
                              statusMap[applicant.jobseekers_id] === 'cancel'
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
                              style={{ backgroundColor: 'red', color: 'white' }}
                            >
                              rejected
                            </option>
                          </Select>
                        </Flex>
                      </TbodyData>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>

          {/* Table End */}
        </Card>
      </Box>
      {/* <Footer /> */}
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
