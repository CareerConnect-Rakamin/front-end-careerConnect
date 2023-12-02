import Wrapper from '@/components/Wrapper';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text
} from '@chakra-ui/react';
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
            <Flex direction={'column'} m={6} fontFamily={'lexendDeca'}>
              <Text
                textAlign={'center'}
                fontSize={'2xl'}
                fontWeight={'semibold'}
                color={'blue.300'}
                mb={5}
              >
                Kemitraan Bersama
              </Text>
              <Text textAlign={'justify'} color={'blue.800'}>
                CareerConnect membangun kemitraan dengan berbagai perusahaan
                untuk memastikan bahwa kami memiliki akses terhadap beragam
                kesempatan pekerjaan. Kami berkomitmen untuk menjadi penghubung
                yang handal antara pencari kerja dan perusahaan.
              </Text>
            </Flex>
          </Box>
          <Box h={'300px'} boxShadow={'xl'} rounded={'xl'} bg={'white'}>
            <Flex direction={'column'} m={6} fontFamily={'lexendDeca'}>
              <Text
                textAlign={'center'}
                fontSize={'2xl'}
                fontWeight={'semibold'}
                color={'blue.300'}
                mb={5}
              >
                Keamanan dan Privasi
              </Text>
              <Text textAlign={'justify'} color={'blue.800'}>
                Keamanan dan privasi informasi pengguna adalah prioritas utama
                kami. Kami mengambil langkah-langkah untuk memastikan bahwa
                setiap data yang dibagikan dengan kami dikelola dengan aman dan
                sesuai dengan standar privasi tertinggi.
              </Text>
            </Flex>
          </Box>
        </SimpleGrid>
        <Flex justifyContent={'center'}>
          <Text
            fontSize={'md'}
            fontWeight={'bold'}
            fontFamily={'lexendDeca'}
            color={'blue.700'}
            textAlign={'center'}
            w={'700px'}
          >
            Bergabunglah dengan CareerConnect dan mulailah perjalanan Anda
            menuju karir yang sukses! Kami berkomitmen untuk membantu Anda
            mencapai impian dan aspirasi karir Anda.
          </Text>
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
      <Stack padding={10}>
        <Text
          fontSize={'3xl'}
          fontWeight={'bold'}
          fontFamily={'lexendDeca'}
          color={'blue.400'}
          textAlign={'center'}
        >
          Bagaimana CareerConnect Bekerja?
        </Text>
        <Flex justifyContent={'center'} mt={5}>
          <Accordion
            allowMultiple
            w={'700px'}
            boxShadow={'xl'}
            rounded={'xl'}
            fontFamily={'lexendDeca'}
          >
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontWeight={'semibold'}
                    color={'blue.700'}
                  >
                    Daftar Akun
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} fontWeight={'light'}>
                Pendaftaran di CareerConnect adalah langkah pertama Anda menuju
                peluang karier yang tak terbatas. Isi profil Anda dengan
                informasi lengkap dan rinci.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontWeight={'semibold'}
                    color={'blue.700'}
                  >
                    Pencarian Pekerjaan
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} fontWeight={'light'}>
                Gunakan fitur pencarian kami untuk menemukan pekerjaan sesuai
                kriteria Anda. Filter berdasarkan posisi dan lokasi yang Anda
                miliki.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontWeight={'semibold'}
                    color={'blue.700'}
                  >
                    Melamar Pekerjaan
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} fontWeight={'light'}>
                Ajukan lamaran dengan mudah melalui platform kami. Kirimkan CV
                dan surat lamaran Anda tanpa repot.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontWeight={'semibold'}
                    color={'blue.700'}
                  >
                    Rekrutmen Efisien
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} fontWeight={'light'}>
                Perusahaan juga dapat memanfaatkan CareerConnect untuk mencari
                calon karyawan yang ideal. Gunakan fitur rekrutmen kami untuk
                menyaring pelamar dan mengelola proses seleksi dengan lebih
                efisien.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
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
          Meet Our Team
        </Text>
        <Flex justifyContent={'center'} alignItems={'center'} gap={4} m={5}>
          <Box
            boxShadow={'xl'}
            width={'260px'}
            height={'260px'}
            rounded={'lg'}
            fontFamily={'lexendDeca'}
          >
            <Flex justifyContent={'center'} mt={8}>
              <Avatar
                src="/images/team/daffa.jpg"
                size={'xl'}
                justifyContent={'center'}
                transition={'all 0.3s'}
                _hover={{ transform: 'scale(1.1)' }}
              />
            </Flex>
            <Flex
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              p={5}
            >
              <Text textAlign={'center'} fontWeight={'semibold'} mb={4}>
                Muhammad Daffa Satria Negara
              </Text>
              <Text textAlign={'center'} fontWeight={'light'} fontSize={'sm'}>
                Fullstack Web Developer
              </Text>
            </Flex>
          </Box>

          <Box
            boxShadow={'xl'}
            width={'260px'}
            height={'260px'}
            rounded={'lg'}
            fontFamily={'lexendDeca'}
          >
            <Flex justifyContent={'center'} mt={8}>
              <Avatar
                src="/images/team/inal.jpg"
                size={'xl'}
                justifyContent={'center'}
                transition={'all 0.3s'}
                _hover={{ transform: 'scale(1.1)' }}
              />
            </Flex>
            <Flex
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              p={5}
            >
              <Text textAlign={'center'} fontWeight={'semibold'} mb={4}>
                Inal Mahpud
              </Text>
              <Text textAlign={'center'} fontWeight={'light'} fontSize={'sm'}>
                Fullstack Web Developer
              </Text>
            </Flex>
          </Box>

          <Box
            boxShadow={'xl'}
            width={'260px'}
            height={'260px'}
            rounded={'lg'}
            fontFamily={'lexendDeca'}
          >
            <Flex justifyContent={'center'} mt={8}>
              <Avatar
                src="/images/team/bagus.jpeg"
                size={'xl'}
                justifyContent={'center'}
                transition={'all 0.3s'}
                _hover={{ transform: 'scale(1.1)' }}
              />
            </Flex>
            <Flex
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              p={5}
            >
              <Text textAlign={'center'} fontWeight={'semibold'} mb={4}>
                Bagus Dwi Jauhari
              </Text>
              <Text textAlign={'center'} fontWeight={'light'} fontSize={'sm'}>
                Fullstack Web Developer
              </Text>
            </Flex>
          </Box>

          <Box
            boxShadow={'xl'}
            width={'260px'}
            height={'260px'}
            rounded={'lg'}
            fontFamily={'lexendDeca'}
          >
            <Flex justifyContent={'center'} mt={8}>
              <Avatar
                src="/images/team/erza.jpg"
                size={'xl'}
                justifyContent={'center'}
                transition={'all 0.3s'}
                _hover={{ transform: 'scale(1.1)' }}
              />
            </Flex>
            <Flex
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              p={5}
            >
              <Text textAlign={'center'} fontWeight={'semibold'} mb={4}>
                Erza Ikhsani
              </Text>
              <Text textAlign={'center'} fontWeight={'light'} fontSize={'sm'}>
                Fullstack Web Developer
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Flex justifyContent={'center'} alignItems={'center'} gap={4} m={5}>
          <Box
            boxShadow={'xl'}
            width={'260px'}
            height={'260px'}
            rounded={'lg'}
            fontFamily={'lexendDeca'}
          >
            <Flex justifyContent={'center'} mt={8}>
              <Avatar
                src="/images/team/bhanu.jpeg"
                size={'xl'}
                justifyContent={'center'}
                transition={'all 0.3s'}
                _hover={{ transform: 'scale(1.1)' }}
              />
            </Flex>
            <Flex
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              p={5}
            >
              <Text textAlign={'center'} fontWeight={'semibold'} mb={4}>
                Aswangga Bhanu Rizqullah
              </Text>
              <Text textAlign={'center'} fontWeight={'light'} fontSize={'sm'}>
                Fullstack Web Developer
              </Text>
            </Flex>
          </Box>

          <Box
            boxShadow={'xl'}
            width={'260px'}
            height={'260px'}
            rounded={'lg'}
            fontFamily={'lexendDeca'}
          >
            <Flex justifyContent={'center'} mt={8}>
              <Avatar
                src="/images/team/juna.jpg"
                size={'xl'}
                justifyContent={'center'}
                transition={'all 0.3s'}
                _hover={{ transform: 'scale(1.1)' }}
              />
            </Flex>
            <Flex
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              p={5}
            >
              <Text textAlign={'center'} fontWeight={'semibold'} mb={4}>
                Christophel J.I. Soge
              </Text>
              <Text textAlign={'center'} fontWeight={'light'} fontSize={'sm'}>
                Fullstack Web Developer
              </Text>
            </Flex>
          </Box>

          <Box
            boxShadow={'xl'}
            width={'260px'}
            height={'260px'}
            rounded={'lg'}
            fontFamily={'lexendDeca'}
          >
            <Flex justifyContent={'center'} mt={8}>
              <Avatar
                src="/images/team/nicho.JPG"
                size={'xl'}
                justifyContent={'center'}
                transition={'all 0.3s'}
                _hover={{ transform: 'scale(1.1)' }}
              />
            </Flex>
            <Flex
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              p={5}
            >
              <Text textAlign={'center'} fontWeight={'semibold'} mb={4}>
                Nicholas Sumanto
              </Text>
              <Text textAlign={'center'} fontWeight={'light'} fontSize={'sm'}>
                Fullstack Web Developer
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Stack>
    </Wrapper>
  );
}
