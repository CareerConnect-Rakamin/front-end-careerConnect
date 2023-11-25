import CardJobVacancy from '@/components/CardJobVacancy';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import Wrapper from '@/components/Wrapper';
import { getJobs } from '@/modules/fetch';
import { Flex, Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function SearchPage() {
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
        <title>Search Jobs - CareerConnect</title>
      </Head>
      <Flex justifyContent={'center'} w={'full'} bg={'custom.dark_blue'}>
        <Stack p={10}>
          <Text
            color={'white'}
            fontSize={'3xl'}
            fontWeight={'semibold'}
            textAlign={'center'}
            fontFamily={'lexendDeca'}
          >
            Temukan Pekerjaan yang Cocok untuk Anda
          </Text>
          <SearchBar />
        </Stack>
      </Flex>
      <Flex justifyContent={'center'} wrap={'wrap'} padding={10} gap={8}>
        {jobs?.map((job) => (
          <CardJobVacancy key={job.id} job={{ ...job }} />
        ))}
      </Flex>
      <Pagination page={page} setPage={setPage} />
    </Wrapper>
  );
}
