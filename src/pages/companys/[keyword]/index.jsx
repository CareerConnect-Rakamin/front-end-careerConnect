import CardJobVacancy from '@/components/CardCompany';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchCompany';
import Wrapper from '@/components/Wrapper';
import { searchJobs } from '@/modules/fetch';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const router = useRouter();
  const { keyword } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (keyword) {
        try {
          const response = await searchJobs(page, keyword);
          const lastPage = response.pagination;
          setJobs(response.data);
          setLastPage(lastPage);
        } catch (error) {
          console.error('Error fetching Companies:', error);
        }
      }
    };

    fetchData();
  }, [page, keyword]);

  return (
    <Wrapper>
      <Head>
        <title>Search Companies - CareerConnect</title>
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
      <Box textAlign={'center'} marginTop={5} fontFamily={'lexendDeca'}>
        <Text>Hasil pencarian dengan kata kunci: {keyword}</Text>
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
