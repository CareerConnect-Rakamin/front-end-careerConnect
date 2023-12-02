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
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
  Tr,
  useDisclosure
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { validateToken } from '@/hooks/tokenValidation';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { BsPersonWorkspace } from 'react-icons/bs';
import { IoPeople } from 'react-icons/io5';
import Head from 'next/head';
import { ArrowBackIcon } from '@chakra-ui/icons';

export default function JobById() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [statusMap, setStatusMap] = useState({});
  const [userId, setUserId] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');
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
      router.push('/');
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const handleSelectChange = async (event, applicantId) => {
    setSelectedApplicantId(applicantId);
    setSelectedValue(event.target.value);
    setModalIsOpen(true);
  };

  const handleModalConfirm = async () => {
    setModalIsOpen(false);
    const newStatusMap = {
      ...statusMap,
      [selectedApplicantId]: selectedValue
    };

    try {
      await updateStatusApplicants(id, selectedValue, selectedApplicantId);
      setStatusMap(newStatusMap);
    } catch (e) {
      console.error(e);
    }
  };

  const handleModalCancel = () => {
    setModalIsOpen(false);
  };

  const formattedSalary = `${Number(job.salary).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`;

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
        if (companyJob && userId) {
          if (companyJob.data.companies_id == userId) {
            setJob(companyJob.data);
          } else {
            router.push('/');
          }
        }
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
    <>
      <Head>
        <title>Applicants Data</title>
      </Head>
      <Navbar />
      {isLoading ? (
        <Skeleton height="300px" my="6" />
      ) : (
        <Box mt={'4rem'} p={5} fontFamily={'lexendDeca'}>
          <Link
            href={`/company/jobs/${userId}`}
            style={{ textDecoration: 'none' }}
            fontSize={{ base: '14px', md: '18', lg: '20px' }}
            fontFamily={'lexendDeca'}
            _hover={{ color: 'custom.blue', paddingLeft: '5px' }}
            transition={'0.3s'}
            color={'gray.600'}
          >
            <ArrowBackIcon />
            Kembali
          </Link>
          <Card bg="#F5F5F5" rounded="10" boxShadow="lg" p={4} mt={4}>
            {/* Header Start */}
            <Text fontSize={'4xl'} color="blue.800" fontWeight="bold" px="10px">
              Data Pelamar Pekerjaan
            </Text>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              px="10px"
              py={4}
              rounded={'lg'}
              boxShadow={'xl'}
              bg={'gray.50'}
            >
              <Stack>
                <Flex p={2} alignItems="center" gap={'4rem'}>
                  <Stack>
                    <Text fontSize="xl" fontWeight="bold">
                      {job.name}
                    </Text>
                    <Text fontSize="17px" fontWeight="normal">
                      {job.category}
                    </Text>
                  </Stack>
                  <Stack>
                    <Flex align={'center'} gap={2}>
                      <FaLocationDot size={'24px'} />
                      <Text fontSize={'md'} fontWeight={'light'}>
                        {job.location}
                      </Text>
                    </Flex>
                    <Flex alignItems={'center'} gap={2}>
                      <MdOutlineAttachMoney size={'24px'} />
                      <Text fontSize={'md'} fontWeight={'light'}>
                        {formattedSalary}
                      </Text>
                    </Flex>
                  </Stack>
                  <Stack>
                    <Flex align={'center'} gap={2}>
                      <BsPersonWorkspace size={'24px'} />
                      <Text fontSize={'md'} fontWeight={'light'}>
                        {job.job_type}
                      </Text>
                    </Flex>
                    <Flex align={'center'} gap={2}>
                      <IoPeople size={'24px'} />
                      <Text fontSize={'md'} fontWeight={'light'}>
                        {job.capacity} Lowongan
                      </Text>
                    </Flex>
                  </Stack>
                </Flex>
              </Stack>
              <Flex
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
                bg="custom.blue"
                rounded="10px"
                p={7}
              >
                <Text color="gray.100" fontSize="21px" fontWeight="normal">
                  Jumlah Pelamar Pekerjaan
                </Text>
                <Text color="white" fontSize="30px" fontWeight="bold">
                  {applicants.length} Pelamar
                </Text>
              </Flex>
            </Flex>
            {/* Header end */}

            {/* Table start */}

            <TableContainer
              rounded="10px"
              mt={8}
              py={7}
              px="10px"
              bg={'gray.50'}
            >
              <Table size={'sm'} variant={'simple'}>
                <Thead bg="custom.blue">
                  <Tr>
                    <TheadData>Nama Lengkap</TheadData>
                    <TheadData>Umur</TheadData>
                    <TheadData>Jenis Kelamin</TheadData>
                    <TheadData>Alamat</TheadData>
                    <TheadData>Nomor Telepon</TheadData>
                    <TheadData>CV</TheadData>
                    <TheadData>Aksi</TheadData>
                  </Tr>
                </Thead>
                <Tbody>
                  {applicants && applicants.length === 0 ? (
                    <Tr>
                      <TbodyData>
                        Belum ada yang melamar pekerjaan ini
                      </TbodyData>
                    </Tr>
                  ) : (
                    applicants.map((applicant) => (
                      <Tr key={applicant.jobseekers_id}>
                        <TbodyData>{applicant.jobseeker_name}</TbodyData>
                        <TbodyData>{applicant.age} Tahun</TbodyData>
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
                          <Flex gap={3}>
                            <Link
                              href={`https://wa.me/${applicant.phone_number}`}
                              target="_blank"
                            >
                              <Button bg="#459B72" color="white">
                                Kontak
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
                                handleSelectChange(
                                  event,
                                  applicant.jobseekers_id
                                )
                              }
                              textColor={
                                statusMap[applicant.jobseekers_id] ===
                                  'rejected' ||
                                statusMap[applicant.jobseekers_id] === 'cancel'
                                  ? 'white'
                                  : statusMap[applicant.jobseekers_id] ===
                                      'accepted'
                                    ? 'white'
                                    : statusMap[applicant.jobseekers_id] ===
                                        'interview'
                                      ? 'white'
                                      : 'black'
                              }
                              bg={
                                statusMap[applicant.jobseekers_id] ===
                                  'rejected' ||
                                statusMap[applicant.jobseekers_id] === 'cancel'
                                  ? 'red'
                                  : statusMap[applicant.jobseekers_id] ===
                                      'accepted'
                                    ? 'green'
                                    : statusMap[applicant.jobseekers_id] ===
                                        'interview'
                                      ? 'blue.500'
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
          <Modal isOpen={modalIsOpen} onClose={handleModalCancel}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Confirmation</ModalHeader>
              <ModalBody>{`Apakah Anda yakin mengubah status ini menjadi ${selectedValue}?`}</ModalBody>
              <ModalFooter>
                <Button colorScheme="green" mr={3} onClick={handleModalConfirm}>
                  Yes
                </Button>
                <Button variant="outline" onClick={handleModalCancel}>
                  No
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      )}
    </>
  );
}

const TheadData = (props) => {
  const { children } = props;
  return (
    <Th
      color="white"
      fontWeight="semibold"
      fontSize="12px"
      border="1px solid black"
      fontFamily={'lexendDeca'}
      py={3}
    >
      {children}
    </Th>
  );
};

const TbodyData = (props) => {
  const { children } = props;
  return (
    <Td border="1px solid black" fontSize="14px" fontWeight={'light'}>
      {children}
    </Td>
  );
};
