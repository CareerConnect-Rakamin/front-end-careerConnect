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
  Text
} from '@chakra-ui/react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';

export default function CompanyProfile() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <ChakraProvider>
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
                <ImageAndTeksInline image="https://placehold.co/600x400">
                  Dashboard Perusahaan
                </ImageAndTeksInline>
                <ImageAndTeksInline image="https://placehold.co/600x400">
                  Data Lowongan Pekerjaan
                </ImageAndTeksInline>
                <ImageAndTeksInline image="https://placehold.co/600x400">
                  Tambah Data Lowongan
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
                  alt="photo.profile"
                  boxSize="155px"
                  borderRadius="full"
                  objectFit="cover"
                />
                <Stack>
                  <Text fontSize={'30px'}>Company Name</Text>
                  <Text
                    fontSize={'20px'}
                    fontWeight="normal"
                    textColor={'#9DA1A6'}
                  >
                    email@example.com
                  </Text>
                </Stack>
              </Flex>
            </CardHeader>
            <CardBody>
              <Stack>
                <TitleTeks>Profil perushaan</TitleTeks>
                <Text fontSize={'19px'} fontWeight={'normal'}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Debitis ducimus voluptatem sed quae, vitae itaque, eius
                  dignissimos, odit voluptatibus fugiat aspernatur error
                  reprehenderit accusantium explicabo quasi! Recusandae
                  laboriosam cumque accusamus.
                </Text>
                <ImageAndTeksInline image="https://placehold.co/600x400">
                  0812 6544 4211
                </ImageAndTeksInline>
                <ImageAndTeksInline image="https://placehold.co/600x400">
                  Kemang, Jakarta Selatan
                </ImageAndTeksInline>
                <Flex justifyContent="space-between" alignItems="center">
                  <ImageAndTeksInline image="https://placehold.co/600x400">
                    <Link href="#">www.iamryangosling.co.id</Link>
                  </ImageAndTeksInline>
                  <Button bg="#FFBA79" color={'black'}>
                    Edit Data Perusahaan
                  </Button>
                </Flex>
                <TitleTeks>Data Lowongan Pekerjaan dan Pelamar</TitleTeks>
                <BoxCountJobs
                  image="https://placehold.co/600x400"
                  count="12"
                  href={`/company/jobs/${id}`}
                >
                  Jumlah Data Lowongan Pekerjaanyang diupload
                </BoxCountJobs>
                <BoxCountJobs image="https://placehold.co/600x400" count="250">
                  Jumlah Data Pelamar Pekerjaan yang Mendaftar
                </BoxCountJobs>
              </Stack>
            </CardBody>
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
