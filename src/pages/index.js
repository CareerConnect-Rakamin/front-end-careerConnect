import { Button, Flex, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleClick = () => router.push('/auth/login');

  return (
    <Flex p={10} align={'center'} justify={'center'} direction={'column'}>
      <Head>
        <title>Home</title>
      </Head>
      <Heading>HOME PAGE</Heading>
      <Button
        m={10}
        color={'white'}
        bgColor={'gray'}
        w={'10%'}
        h="2rem"
        size="md"
        onClick={handleClick}
      >
        Login
      </Button>
    </Flex>
  );
}
