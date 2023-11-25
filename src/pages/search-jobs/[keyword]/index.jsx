import CardJobVacancy from '@/components/CardJobVacancy';
import SearchBar from '@/components/SearchBar';
import Wrapper from '@/components/Wrapper';
import { searchJobs } from '@/modules/fetch';
import { Box, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();
  const { keyword } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (keyword) {
        try {
          const response = await searchJobs(keyword);
          setJobs(response.data);
        } catch (error) {
          console.error('Error fetching jobs:', error);
        }
      }
    };

    fetchData();
  }, [keyword]);

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
      <Box textAlign={'center'} marginTop={5} fontFamily={'lexendDeca'}>
        <Text>Hasil pencarian dengan kata kunci: {keyword}</Text>
      </Box>
      <Flex
        minChildWidth={'250px'}
        justifyContent={'center'}
        wrap={'wrap'}
        padding={10}
        gap={8}
      >
        {jobs?.map((job) => (
          <CardJobVacancy key={job.id} job={{ ...job }} />
        ))}
      </Flex>
    </Wrapper>
  );
}
