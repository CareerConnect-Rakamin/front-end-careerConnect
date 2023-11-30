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
  Skeleton,
  Stack,
  Text
} from '@chakra-ui/react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCompanyById, getCompanyJobs } from '@/modules/fetch';
import customTheme from '@/styles/theme';
import jwt from 'jsonwebtoken';

export default function CompanyProfile() {
  const [company, setCompany] = useState();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const [userId, setUserId] = useState();
  const { id } = router.query;

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const decodeToken = jwt.decode(token);

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

    if (decodeToken) {
      setUserId(decodeToken.id);
    }

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

  console.log(userId, id);
  return (
    <ChakraProvider theme={customTheme}>
      {isLoading ? (
        <Skeleton height="300px" my="6" />
      ) : (
        <>
          <Navbar />

          {userId != id ? (
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
              templateAreas={`
          "side profile"`}
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
    </ChakraProvider>
  );
}

const ImageAndTeksInline = (props) => {
  const {
    image,
    children,
    boxSize = '23px',
    fontSize = '18px',
    textColor = 'black',
    alt = 'image.png'
  } = props;
  return (
    <Flex gap={2} alignItems="center">
      <Image src={image} boxSize={boxSize} alt={alt} />
      <Text fontSize={fontSize} fontWeight={'semibold'} textColor={textColor}>
        {children}
      </Text>
    </Flex>
  );
};

const TitleTeks = (props) => {
  const { children } = props;
  return (
    <Text mt={2} textAlign="left" fontSize={'25px'} fontWeight={'bold'}>
      {children}
    </Text>
  );
};

const BoxCountJobs = (props) => {
  const { image, children, count, href } = props;
  return (
    <Box w="60%" bg="#459B72" p="12px" rounded="10px">
      <Text textColor="white" fontWeight="bold" fontSize="26px">
        {children}
      </Text>
      <hr style={{ width: '100%', borderTop: '3px solid white' }} />

      <Flex justifyContent="space-between" alignItems="center">
        <ImageAndTeksInline
          image={image}
          boxSize="70px"
          fontSize="69px"
          textColor="white"
          alt={`Icon untuk menampilkan jumlah: ${count}`}
        >
          {count}
        </ImageAndTeksInline>
        <Link href={href}>
          <Button
            bg="#557C55"
            rounded="10"
            textColor="white"
            _hover={{ bg: 'white', textColor: 'black' }}
          >
            Lihat Data
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

const SideBar = (props) => {
  const { photoProfile, companyName } = props;
  return (
    <>
      {/* Side Nav Start */}
      <Card
        bg={'#F5F5F5'}
        boxShadow="md"
        mx="auto"
        my="auto"
        h="400px"
        position="fixed"
        minW="330px"
      >
        <CardHeader p={'10px'}>
          <Flex flexDirection="column" alignItems="center">
            <Image
              src={`http://localhost:3000/api/v1/${photoProfile}`}
              boxSize="125px"
              borderRadius="10px"
              objectFit="cover"
              alt="photo.profile"
            />
            <Text mt={2}>{companyName}</Text>
          </Flex>
        </CardHeader>
        <CardBody p={'10px'}>
          <Stack>
            <Text mt={2} textAlign="left">
              Menu Utama
            </Text>
            <hr style={{ width: '75%', borderTop: '2px solid #2A5C91' }} />
            <ImageAndTeksInline
              image="/company-profile/dashboard.png"
              alt="dashboar.png"
            >
              <Link>Dashboard Perusahaan</Link>
            </ImageAndTeksInline>
            <ImageAndTeksInline
              image="/company-profile/info-jobs.png"
              alt="infojobs.png"
            >
              <Link>Data Lowongan Pekerjaan</Link>
            </ImageAndTeksInline>
            <ImageAndTeksInline
              image="/company-profile/add-jobs.png"
              alt="addjobs.png"
            >
              <Link>Tambah Data Lowongan</Link>
            </ImageAndTeksInline>
          </Stack>
        </CardBody>
      </Card>
      {/* Side Nav End */}
    </>
  );
};

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
      bg={'#F5F5F5'}
      boxShadow="md"
      p="20px"
      {...(id != userId && { my: '6rem', mx: '2rem', rounded: 10 })}
    >
      <CardHeader>
        <Flex gap={4} alignItems="center">
          <Box>
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
                fontSize="sm"
                p="1"
                mt={'-2rem'}
                ml={'7rem'}
              >
                <Image src="/company-profile/camera.png" />
              </Button>
            </Link>
          </Box>
          <Stack>
            <Text fontSize={'30px'}>{companyName}</Text>
            <Text fontSize={'20px'} fontWeight="normal" textColor={'#9DA1A6'}>
              {email}
            </Text>
          </Stack>
        </Flex>
      </CardHeader>
      <CardBody>
        <Stack>
          <TitleTeks>Profil perushaan</TitleTeks>
          <Text fontSize={'19px'} fontWeight={'normal'}>
            {description}
          </Text>
          <ImageAndTeksInline
            image="/company-profile/phone-call.png"
            alt="phonecall.png"
          >
            {phoneNumber}
          </ImageAndTeksInline>
          <ImageAndTeksInline
            image="/company-profile/location.png"
            alt="location.png"
          >
            {address}
          </ImageAndTeksInline>
          <Flex justifyContent="space-between" alignItems="center">
            <ImageAndTeksInline
              image="/company-profile/website.png"
              alt="website.png"
            >
              <Link href={`https://${website}`} target="_blank">
                {website}
              </Link>
            </ImageAndTeksInline>
            {id == userId && (
              <Link href={`/company/update/${id}`}>
                <Button bg="#FFBA79" color={'black'}>
                  Edit Data Perusahaan
                </Button>
              </Link>
            )}
            {id == userId && (
              <Link href={`/company/update/account/${id}`}>
                <Button bg="#FFBA79" color={'black'}>
                  Edit Account
                </Button>
              </Link>
            )}
          </Flex>
          <TitleTeks>Data Lowongan Pekerjaan dan Pelamar</TitleTeks>
          <BoxCountJobs
            image="/company-profile/cont-jobs.png"
            count={jobs.length}
            href={`/company/jobs/${id}`}
          >
            {userId == id
              ? 'Jumlah Data Lowongan Pekerjaanyang diupload'
              : 'jumlah pekerjaan yang ada di Company ini'}
          </BoxCountJobs>
          {id == userId && (
            <BoxCountJobs
              image="/company-profile/count-applicants.png"
              count="250"
            >
              Jumlah Data Pelamar Pekerjaan yang Mendaftar
            </BoxCountJobs>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};
