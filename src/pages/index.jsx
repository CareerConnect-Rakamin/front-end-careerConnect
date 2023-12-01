import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Box, Flex, Heading, Text, useToast } from '@chakra-ui/react';
import { getJobs } from '@/modules/fetch';
import CardJobVacancy from '@/components/CardJobVacancy';
import Wrapper from '@/components/Wrapper';
import Hero from '@/components/Hero';
import Pagination from '@/components/Pagination';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [lastPage, setLastPage] = useState(0);

  const fetchData = async () => {
    try {
      const job_type = router.query.job_type;
      const search = router.query.search;
      const response = await getJobs(page, search, job_type);

      if (response.data.length === 0) {
        return;
      }

      setJobs(response.data);
      setLastPage(response.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: 'Error',
        description: 'Error fetching jobs. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-center',
        render: () => (
          <Box
            textAlign={'center'}
            borderRadius={20}
            color="white"
            p={3}
            bg="red.500"
          >
            No jobs found
          </Box>
        )
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, router.query.search, router.query.job_type]);

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
