import Head from 'next/head';
import Wrapper from '@/components/Wrapper';
import { Box, Heading, Text } from '@chakra-ui/react';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - CareerConnect</title>
      </Head>
      <Wrapper>
        <Box textAlign={'center'} marginTop={5} fontFamily={'lexendDeca'}>
          <Heading color={'custom.dark_blue'}>Karir Terbaru Untuk Anda</Heading>
          <Text>Temukan Karir yang Sesuai Untuk Anda</Text>
        </Box>
      </Wrapper>
    </>
  );
}
