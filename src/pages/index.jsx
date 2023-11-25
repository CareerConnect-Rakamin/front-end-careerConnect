import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { getJobs } from '@/modules/fetch';
import CardJobVacancy from '@/components/CardJobVacancy';
import Wrapper from '@/components/Wrapper';
import Hero from '@/components/Hero';
import Pagination from '@/components/Pagination';

export default function Home() {
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState([]);

  const fetchData = async () => {
    const response = await getJobs(page);
    const newJobs = response.data;

    setJobs(newJobs);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <Wrapper>
      <Head>
        <title>Home - CareerConnect</title>
      </Head>
      <Hero />
      <Box textAlign={'center'} marginTop={5} fontFamily={'lexendDeca'}>
        <Heading color={'custom.dark_blue'}>Karir Terbaru Untuk Anda</Heading>
        <Text>Temukan Karir yang Sesuai Untuk Anda</Text>
      </Box>
      <Flex justifyContent={'center'} wrap={'wrap'} padding={10} gap={8}>
        {jobs?.map((job) => (
          <CardJobVacancy key={job.id} job={{ ...job }} />
        ))}
      </Flex>
      <Pagination page={page} setPage={setPage} />
    </Wrapper>
  );
}
