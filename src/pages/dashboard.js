import { Button, Flex, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      router.push('/');
    }
  }, []);

  const logoutHandler = async () => {
    window.localStorage.removeItem('token');
    setIsLogin(false);
    router.push('/');
  };

  return (
    <Flex p={10} align={'center'} justify={'center'} direction={'column'}>
      <Head>
        <title>Home</title>
      </Head>
      <Heading>DASHBOARD</Heading>
      <Button
        m={10}
        color={'white'}
        bgColor={'gray'}
        w={'10%'}
        h="2rem"
        size="md"
        onClick={logoutHandler}
      >
        Logout
      </Button>
    </Flex>
  );
}
