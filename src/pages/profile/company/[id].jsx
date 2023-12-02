import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Link,
  Skeleton,
  Stack,
  Text
} from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCompanyById, getCompanyJobs } from '@/modules/fetch';
import { validateToken } from '@/hooks/tokenValidation';
import SideBar from '@/components/company/Sidebar';
import { MdAddAPhoto } from 'react-icons/md';
import { PhoneIcon } from '@chakra-ui/icons';
import { MdLocationOn } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';
import { IoBriefcase } from 'react-icons/io5';

export default function CompanyProfile() {
  const [company, setCompany] = useState();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
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
    const fetchCompanyById = async () => {
      try {
        if (id) {
          const response = await getCompanyById(id);
          setCompany(response.data);
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };

    const fetchCompanyJobs = async () => {
      try {
        if (id) {
          const response = await getCompanyJobs(id);
          setJobs(response.data);
        }
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };

    if (id) {
      fetchCompanyById();
      fetchCompanyJobs();
    }
  }, [id]);

  if (!isLoading && !company) {
    // Redirect to 404 page if company data is not found
    router.push('/404');
    return null;
  }

  return (
    <>
      {isLoading ? (
        <Skeleton height="300px" my="6" />
      ) : (
        <>
          <Navbar />

          {userId != id || validateToken === false ? (
            <MainCard
              id={id}
              photoProfile={company.photo_profile}
              companyName={company.name}
              email={company.email}
              description={company.description}
              phoneNumber={company.phone_number}
              address={company.address}
              website={company.website}
              jobs={jobs}
              userId={userId}
            />
          ) : (
            <Grid
              templateAreas={`"side profile"`}
              gridTemplateRows={'full 1fr full'}
              gridTemplateColumns={'350px 1fr'} // Mengatur lebar kolom "side" menjadi sekitar 300
              h="100%"
              gap="1"
              color="blackAlpha.700"
              fontWeight="bold"
              mt={70}
              mb={0}
            >
              <GridItem p="5" pr={'2px'} area={'side'}>
                <SideBar
                  photoProfile={company.photo_profile}
                  companyName={company.name}
                />
              </GridItem>
              {/* Side Nav End */}

              {/* Main Start */}
              <GridItem p="5" area={'profile'}>
                <MainCard
                  id={id}
                  photoProfile={company.photo_profile}
                  companyName={company.name}
                  email={company.email}
                  description={company.description}
                  phoneNumber={company.phone_number}
                  address={company.address}
                  website={company.website}
                  jobs={jobs}
                  userId={userId}
                />
              </GridItem>
              {/* Main End */}
            </Grid>
          )}
        </>
      )}
    </>
  );
}

const MainCard = (props) => {
  const {
    id,
    photoProfile,
    companyName,
    email,
    description,
    phoneNumber,
    address,
    website,
    jobs,
    userId
  } = props;
  return (
    <Card
      bg={'gray.50'}
      boxShadow="md"
      p="20px"
      fontFamily={'lexendDeca'}
      {...(id != userId && { my: '6rem', mx: '2rem', rounded: 10 })}
    >
      <CardHeader>
        <Flex gap={4} alignItems="center">
          <Box mr={5}>
            <Image
              src={`http://localhost:3000/api/v1/${photoProfile}`}
              boxSize="155px"
              borderRadius="full"
              objectFit="cover"
              alt="photo.profile"
            />
            <Link href={`update/photo/${id}`}>
              <Button
                position="absolute"
                bgColor="#2A5C91"
                color="white"
                borderRadius="100%"
                p="1"
                mt={'-2rem'}
                ml={'7rem'}
              >
                <MdAddAPhoto size={25} />
              </Button>
            </Link>
          </Box>
          <Stack>
            <Text fontSize={'3xl'}>{companyName}</Text>
            <Text fontSize={'md'} fontWeight="normal" textColor={'#9DA1A6'}>
              {email}
            </Text>
          </Stack>
        </Flex>
      </CardHeader>
      <CardBody>
        <Stack>
          <Text fontWeight={'bold'} fontSize={'2xl'}>
            Profil Perusahaan
          </Text>
          <Text fontSize={'md'} fontWeight={'light'} mb={1}>
            {description}
          </Text>
          <Flex alignItems={'center'} gap={2}>
            <PhoneIcon />
            <Text fontWeight={'light'}>{phoneNumber}</Text>
          </Flex>
          <Flex alignItems={'center'} gap={2}>
            <MdLocationOn size={20} />
            <Text fontWeight={'light'}>{address}</Text>
          </Flex>
          <Link href={`https://${website}`} target="_blank" color={'#2A5C91'}>
            <Flex alignItems={'center'} gap={2}>
              <TbWorld size={20} color="black" />
              <Text fontWeight={'light'}>{website}</Text>
            </Flex>
          </Link>
          <Flex mt={3} gap={2}>
            {id == userId && (
              <Link href={`/company/update/${id}`}>
                <Button bg="orange.400" color={'white'}>
                  Edit Data Perusahaan
                </Button>
              </Link>
            )}
            {id == userId && (
              <Link href={`/company/update/account/${id}`}>
                <Button bg="orange.400" color={'white'}>
                  Edit Akun
                </Button>
              </Link>
            )}
          </Flex>

          <Text fontWeight={'bold'} fontSize={'2xl'} mt={5}>
            Data Lowongan Pekerjaan dan Pelamar
          </Text>

          <Box bg={'green.500'} w={'470px'} rounded={'lg'} p={3}>
            <Text color={'white'} fontWeight={'bold'} fontSize={'2xl'}>
              Jumlah Data Lowongan Pekerjaan Yang Dibuka
            </Text>
            <Divider borderWidth={3} rounded={'lg'} my={2} />
            <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Flex alignItems={'center'} gap={3}>
                <IoBriefcase color="white" size={'45px'} />
                <Text fontSize={'4xl'} color={'white'}>
                  {jobs.length}
                </Text>
              </Flex>
              <Link href={`/company/jobs/${id}`}>
                <Button>Lihat Data</Button>
              </Link>
            </Flex>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};
