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
import { getCompanyById } from '@/modules/fetch';

export default function CompanyProfile() {
  const [company, setCompany] = useState();
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
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

    if (id) {
      fetchCompanyById();
    }
  }, [id]);

  if (!isLoading && !company) {
    // Redirect to 404 page if company data is not found
    router.push('/404');
    return null;
  }

  return (
    <ChakraProvider>
      {isLoading ? (
        <Skeleton height="300px" my="6" />
      ) : (
        <>
          <Navbar />
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
            {/* Side Nav Start */}
            <GridItem p="5" pr={'2px'} area={'side'}>
              <Card bg={'#F5F5F5'} boxShadow="md" mx="auto" my="auto" h="400px">
                <CardHeader p={'10px'}>
                  <Flex flexDirection="column" alignItems="center">
                    <Image
                      src="https://placehold.co/600x400"
                      boxSize="125px"
                      borderRadius="10px"
                      objectFit="cover"
                      alt="photo.profile"
                    />
                    <Text mt={2}>{company.name}</Text>
                  </Flex>
                </CardHeader>
                <CardBody p={'10px'}>
                  <Stack>
                    <Text mt={2} textAlign="left">
                      Menu Utama
                    </Text>
                    <hr
                      style={{ width: '75%', borderTop: '2px solid #2A5C91' }}
                    />
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
            </GridItem>
            {/* Side Nav End */}

            {/* Main Start */}
            <GridItem p="5" area={'profile'}>
              <Card bg={'#F5F5F5'} boxShadow="md" p="20px">
                <CardHeader>
                  <Flex gap={4} alignItems="center">
                    <Image
                      src="https://placehold.co/600x400"
                      boxSize="155px"
                      borderRadius="full"
                      objectFit="cover"
                      alt="photo.profile"
                    />
                    <Stack>
                      <Text fontSize={'30px'}>{company.name}</Text>
                      <Text
                        fontSize={'20px'}
                        fontWeight="normal"
                        textColor={'#9DA1A6'}
                      >
                        {company.email}
                      </Text>
                    </Stack>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Stack>
                    <TitleTeks>Profil perushaan</TitleTeks>
                    <Text fontSize={'19px'} fontWeight={'normal'}>
                      {company.description}
                    </Text>
                    <ImageAndTeksInline
                      image="/company-profile/phone-call.png"
                      alt="phonecall.png"
                    >
                      {company.phone_number}
                    </ImageAndTeksInline>
                    <ImageAndTeksInline
                      image="/company-profile/location.png"
                      alt="location.png"
                    >
                      {company.address}
                    </ImageAndTeksInline>
                    <Flex justifyContent="space-between" alignItems="center">
                      <ImageAndTeksInline
                        image="/company-profile/website.png"
                        alt="website.png"
                      >
                        <Link href="#">{company.website}</Link>
                      </ImageAndTeksInline>
                      <Link href={`/company/update/${id}`}>
                        <Button bg="#FFBA79" color={'black'}>
                          Edit Data Perusahaan
                        </Button>
                      </Link>
                    </Flex>
                    <TitleTeks>Data Lowongan Pekerjaan dan Pelamar</TitleTeks>
                    <BoxCountJobs
                      image="https://placehold.co/600x400"
                      count="12"
                      href={`/company/jobs/${id}`}
                    >
                      Jumlah Data Lowongan Pekerjaanyang diupload
                    </BoxCountJobs>
                    <BoxCountJobs
                      image="https://placehold.co/600x400"
                      count="250"
                    >
                      Jumlah Data Pelamar Pekerjaan yang Mendaftar
                    </BoxCountJobs>
                  </Stack>
                </CardBody>
              </Card>
            </GridItem>
            {/* Main End */}
          </Grid>
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
        <Button
          bg="#557C55"
          rounded="10"
          textColor="white"
          _hover={{ bg: 'white', textColor: 'black' }}
        >
          <Link href={href}>Lihat Data</Link>
        </Button>
      </Flex>
    </Box>
  );
};
