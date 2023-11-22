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
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';

export default function CompanyJobs() {
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
                <ImageAndTeksInline image="/company-profile/dashboard.png">
                  Dashboard Perusahaan
                </ImageAndTeksInline>
                <ImageAndTeksInline image="/company-profile/info-jobs.png">
                  Data Lowongan Pekerjaan
                </ImageAndTeksInline>
                <ImageAndTeksInline image="/company-profile/add-jobs.png">
                  Tambah Data Lowongan
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
            <Card bg={'#2A5C91'} boxShadow="md" p="20px" my={3}>
              <Flex>
                <Stack w="280px">
                  <Text fontSize="14px" fontWeight="normal" textColor="#C0C0C0">
                    Nama Pekerjaan
                  </Text>
                  <Text fontSize="30px" fontWeight="bold" textColor="white">
                    IT SUPPORT
                  </Text>
                  <Text fontSize="14px" fontWeight="normal" textColor="#C0C0C0">
                    Kategori Pekerjaan
                  </Text>
                  <Text fontSize="17px" fontWeight="bold" textColor="white">
                    IT, COMPUTER, SOFTWARE ENGINEER
                  </Text>
                </Stack>
                <Box w="290px" bg="#0B1A2A" rounded="10" px="25px" py="20px">
                  <Flex gap={1}>
                    <Stack>
                      <ContentMid image="/company-profile/job/lokasi.png">
                        Serang, Banten
                      </ContentMid>
                      <ContentMid image="/company-profile/job/kuota.png">
                        5 orang
                      </ContentMid>
                      <Text fontSize="12px" fontWeight="normal" color="#C0C0C0">
                        Data Pelamar Pekerjaan
                      </Text>
                      <Text fontSize="20px" fontWeight="bold" color="white">
                        5 Pelamar
                      </Text>
                    </Stack>
                    <Stack>
                      <ContentMid image="/company-profile/job/gaji.png">
                        2.500.000
                      </ContentMid>
                      <ContentMid image="/company-profile/job/type.png">
                        WFO
                      </ContentMid>
                    </Stack>
                  </Flex>
                </Box>
                <Stack ml="50px">
                  <ContentRight bg="#459B72" color="white">
                    Lihat Data Pelamar
                  </ContentRight>
                  <ContentRight bg="#FFBA79" color="black">
                    Ubah Data Lowongan
                  </ContentRight>
                  <ContentRight bg="#B72E2E" color="white">
                    Tutup Lowongan
                  </ContentRight>
                </Stack>
              </Flex>
            </Card>
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
