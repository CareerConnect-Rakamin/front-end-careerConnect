import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Flex, Box, Stack, Toast, useToast } from '@chakra-ui/react';
import Head from 'next/head';
import Wrapper from '@/components/Wrapper';
import CompanyCard from '@/components/CardCompany';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchCompany';
import { getCompanies } from '@/modules/fetch';

export default function CompaniesPage() {
  const router = useRouter();
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [companies, setCompanies] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [isEmptySearchResult, setIsEmptySearchResult] = useState(false);

  const fetchCompanies = async () => {
    try {
      const search = router.query.search;
      const response = await getCompanies(page, search);

      if (response.data.length === 0) {
        setIsEmptySearchResult(true);
        return;
      }

      setCompanies(response.data);
      setLastPage(response.pagination.totalPages);
      setIsEmptySearchResult(false);
    } catch (error) {
      console.error('Error fetching companies:', error);

      toast({
        title: 'Error',
        description: 'Perusahaan Tidak Ditemukan!',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-center'
      });
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [page, router.query.search]);

  return (
    <Wrapper>
      <Head>
        <title>Companies - CareerConnect</title>
      </Head>
      <Flex justifyContent="center" mb={4} mt={10}>
        <SearchBar />
      </Flex>

      {isEmptySearchResult && (
        <Flex justifyContent="center" mt={4}>
          <Toast status="error">No companies found for your search</Toast>
        </Flex>
      )}

      <Flex justifyContent="center" wrap="wrap" padding={10} gap={8}>
        {companies.map((company) => (
          <Box key={company.id} width="30%" marginBottom="20px">
            <CompanyCard {...company} />
          </Box>
        ))}
      </Flex>

      <Pagination page={page} setPage={setPage} lastPage={lastPage} />
    </Wrapper>
  );
}
