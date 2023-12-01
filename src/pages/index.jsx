import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { getJobs } from '@/modules/fetch';
import CardJobVacancy from '@/components/CardJobVacancy';
import Wrapper from '@/components/Wrapper';
import Hero from '@/components/Hero';
import Pagination from '@/components/Pagination';

export default function Home() {
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [lastPage, setLastPage] = useState(0);

  const fetchData = async () => {
    try {
      const response = await getJobs(page);
      setJobs(response.data);
      setLastPage(response.pagination);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
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
      <Pagination
        page={page}
        setPage={setPage}
        lastPage={lastPage.totalPages}
      />
    </Wrapper>
  );
}
