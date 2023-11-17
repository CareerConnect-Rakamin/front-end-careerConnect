import { Box, Link, Text, Flex, Stack, Button } from '@chakra-ui/react';
import Image from 'next/image';
import logo from '../../public/logo.png';
import location1 from '../../public/location1.png';
import mail from '../../public/mail.png';
import phone from '../../public/phone.png';
import facebook from '../../public/fb.png';
import instagram from '../../public/ig.png';
import linkedin from '../../public/linkedin.png';
import twitter from '../../public/twitter.png';

const Footer = () => {
  return (
    <Box bg="#0B1A2A" p={2} fontFamily={'Lexend Deca'}>
      <Header />
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mx="auto"
        maxW="container"
        mt={4}
      >
        <BodyHeader title="Kontak">
          <Body1
            image={location1}
            content="JI. Letnan Tukiyat 20 Condong Catur Yogyakarta Indonesia"
          />
          <Body1 image={mail} content="CareerConnect@gmail.com" />
          <Body1 image={phone} content="081254222388" />
        </BodyHeader>

        <BodyHeader title="Pencari Kerja" ml={-40}>
          <Body2>Registrasi Pencari Kerja</Body2>
          <Body2>Cari Lowongan Kerja</Body2>
          <Body2>Kerja Dari Rumah</Body2>
          <Body2>Kerja Dari Kantor</Body2>
        </BodyHeader>

        <BodyHeader title="Perusahaan" mr={10}>
          <Body2>Registrasi Pencari Perushaan</Body2>
          <Body2>Pasang Lowongan Pekerjaan</Body2>
          <Body2>Temukan Kandidat Terbaik</Body2>
          <Body2>Harga Upload Lowongan</Body2>
        </BodyHeader>
        {/* Tiga konten sejajar */}
      </Flex>

      <Flex
        alignItems="center"
        justifyContent="center"
        mx="auto"
        maxW="container"
        mt={4}
      >
        <Text color="white" fontSize="18px" textAlign="center">
          2023 CareerConnect PT kelompok 3A Rakamin.
        </Text>
      </Flex>

      {/* Ikons sosial media */}
      <Flex
        alignItems="center"
        justifyContent="flex-end" // Menempatkan ikon sosial media di sebelah kanan
        mx="auto"
        maxW="container"
        mt={-7}
        mr={5}
        mb={5}
      >
        <Flex gap={4}>
          <Sosmed image={instagram} />
          <Sosmed image={linkedin} />
          <Sosmed image={twitter} />
          <Sosmed image={facebook} />
        </Flex>
      </Flex>
    </Box>
  );
};

const Header = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      mx="auto"
      maxW="container"
    >
      {/* Navigasi (tengah) */}
      <Flex
        alignItems="center"
        fontSize="20px"
        fontWeight="semibold"
        mr={'50px'}
      >
        <Text color={'white'} width={410} fontSize={36} fontWeight={'bold'}>
          Butuh Konsultasi? Silahkan Kontak Kami Kami Siap Membantu
        </Text>
      </Flex>

      <Flex gap={5}>
        <Image
          src={logo}
          style={{ width: '55px', height: '38px', marginTop: '10px' }}
        />
        <Text color="white" fontSize="33px" fontWeight="bold" mt={'5px'}>
          <Link href="#" color="white">
            CareerConnect
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
};

const BodyHeader = (props) => {
  const { children, title, ml = 0, mr = 0 } = props;
  return (
    <Flex direction="column" ml={ml} mr={mr}>
      <Text color="white" fontSize="25px" fontWeight={'bold'} mb={3}>
        {title}
      </Text>
      {children}
    </Flex>
  );
};
const Body1 = (props) => {
  const { image, content } = props;
  return (
    <Flex gap={3}>
      <Image src={image} style={{ width: '28px', height: '29px' }} />
      <Text color="white" fontSize="20px">
        {content}
      </Text>
    </Flex>
  );
};

const Body2 = (props) => {
  const { children, link = '#' } = props;
  return (
    <Text color="white" fontSize="18px">
      <Link href={link}>{children}</Link>
    </Text>
  );
};

const Sosmed = (props) => {
  const { image, link = '#' } = props;
  return (
    <Link href={link} color="white">
      <Image src={image} style={{ width: '28px', height: '29px' }} />
    </Link>
  );
};
export default Footer;
