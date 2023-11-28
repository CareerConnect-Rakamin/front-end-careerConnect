import Wrapper from '@/components/Wrapper';
import { Box, Flex, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';

export default function about() {
  return (
    <Wrapper>
      <Head>
        <title>About - CareerConnect</title>
      </Head>
      <Stack padding={10}>
        <Flex
          justifyContent={'space-around'}
          alignItems={'center'}
          w={'full'}
          wrap={'wrap'}
        >
          <Flex direction={'column'} w={'500px'} fontFamily={'lexendDeca'}>
            <Text
              fontSize={'4xl'}
              fontWeight={'bold'}
              fontFamily={'lexendDeca'}
              color={'blue.400'}
              mb={5}
              textAlign={'right'}
            >
              Tentang CareerConnect
            </Text>
            <Text fontSize="sm" fontWeight="400" textAlign={'right'}>
              Selamat datang di{' '}
              <Text as="span" color="custom.blue" fontWeight={500}>
                CareerConnect
              </Text>
              , platform inovatif yang bertujuan untuk merangkul potensi dan
              membentuk masa depan karirmu. Kami memahami betapa pentingnya
              memiliki akses yang mudah dan efisien untuk mencari pekerjaan yang
              sesuai dengan bakat, keahlian, dan ambisi Anda. Di {''}
              <Text as="span" color="custom.blue" fontWeight={500}>
                CareerConnect
              </Text>
              , kami tidak hanya menyediakan layanan pencarian pekerjaan, tetapi
              juga membangun jembatan antara individu berbakat dan perusahaan
              yang berusaha merekrut talenta terbaik.
            </Text>
          </Flex>
          <Image
            src="/images/about-us1.jpg"
            alt="About CareerConnect 1"
            w={'500px'}
            rounded={'lg'}
            boxShadow={'2xl'}
          />
        </Flex>
      </Stack>
      <Stack padding={10}>
        <Flex
          justifyContent={'space-around'}
          alignItems={'center'}
          w={'full'}
          wrap={'wrap'}
        >
          <Image
            src="/images/about-us2.jpg"
            alt="About CareerConnect 1"
            w={'500px'}
            rounded={'lg'}
            boxShadow={'2xl'}
          />
          <Flex direction={'column'} w={'500px'} fontFamily={'lexendDeca'}>
            <Text
              fontSize={'4xl'}
              fontWeight={'bold'}
              fontFamily={'lexendDeca'}
              color={'blue.400'}
              mb={5}
              textAlign={'left'}
            >
              Misi Kami
            </Text>
            <Text fontSize="sm" fontWeight="400">
              Misi utama kami adalah menciptakan ekosistem yang memungkinkan
              pertemuan yang efisien antara pencari kerja yang berbakat dengan
              perusahaan yang membutuhkan keahlian tertentu. Kami percaya bahwa
              setiap individu memiliki potensi unik, dan setiap perusahaan
              memiliki kebutuhan yang khas.
              <Text as={'span'} color="custom.blue" fontWeight={500}>
                CareerConnect
              </Text>{' '}
              hadir untuk menyatukan keduanya, menciptakan keseimbangan yang
              sempurna di dunia pasar tenaga kerja.
            </Text>
          </Flex>
        </Flex>
      </Stack>
      <Stack padding={10} bg={'#f8f8f8'}>
        <Text
          fontSize={'3xl'}
          fontWeight={'bold'}
          fontFamily={'lexendDeca'}
          color={'blue.400'}
          textAlign={'center'}
        >
          Apa yang Membedakan Kami?
        </Text>
        <SimpleGrid p={10} columns={3} gap={5}>
          <Box h={'300px'} boxShadow={'xl'} rounded={'xl'} bg={'white'}>
            <Flex direction={'column'} m={6} fontFamily={'lexendDeca'}>
              <Text
                textAlign={'center'}
                fontSize={'2xl'}
                fontWeight={'semibold'}
                color={'blue.300'}
                mb={5}
              >
                Teknologi Canggih
              </Text>
              <Text textAlign={'justify'} color={'blue.800'}>
                CareerConnect juga memanfaatkan teknologi terkini untuk
                menyajikan pengalaman pencarian pekerjaan yang lebih cerdas dan
                efektif. Dengan sistem pencocokan yang pintar, kami memastikan
                setiap pencari kerja dan perusahaan memiliki peluang terbaik
                untuk saling berpadu.
              </Text>
            </Flex>
          </Box>
          <Box h={'300px'} boxShadow={'xl'} rounded={'xl'} bg={'white'}>
            <Text
              textAlign={'center'}
              fontSize={'2xl'}
              fontFamily={'lexendDeca'}
              fontWeight={'semibold'}
              color={'blue.400'}
              mt={4}
            >
              Kemitraan Bersama
            </Text>
          </Box>
          <Box h={'300px'} boxShadow={'xl'} rounded={'xl'} bg={'white'}>
            <Text
              textAlign={'center'}
              fontSize={'2xl'}
              fontFamily={'lexendDeca'}
              fontWeight={'semibold'}
              color={'blue.400'}
              mt={4}
            >
              Keamanan dan Privasi
            </Text>
          </Box>
        </SimpleGrid>
      </Stack>
      <Stack padding={10}></Stack>
    </Wrapper>
  );
}
