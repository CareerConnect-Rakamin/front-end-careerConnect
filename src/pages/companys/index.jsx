import React, { useEffect, useState } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import Head from 'next/head';
import Wrapper from '@/components/Wrapper';
import CompanyCard from '@/components/CardCompany';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchCompany';
import { getCompanies } from '@/modules/fetch';

export default function CompaniesPage() {
  const [page, setPage] = useState(1);
  const [companies, setCompanies] = useState([]);
  const [lastPage, setLastPage] = useState(0);

  const fetchCompanies = async () => {
    try {
      const response = await getCompanies(page);
      setCompanies(response.data);
      setLastPage(response.pagination.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [page]);

  return (
    <Wrapper>
      <Head>
        <title>Companies - CareerConnect</title>
      </Head>
      <Flex justifyContent="center" mb={4} mt={10}>
        <SearchBar />
      </Flex>

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
