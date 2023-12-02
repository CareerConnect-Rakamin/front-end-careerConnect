import { SearchIcon } from '@chakra-ui/icons';
import { Button, Flex, Input, Select, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

const SearchBar = () => {
  const searchRef = useRef();
  const router = useRouter();
  const toast = useToast();

  const handleSearch = (event) => {
    const keyword = searchRef.current.value.trim();

    if (event.key === 'Enter' || event.type === 'click') {
      event.preventDefault();

      router.push(`?search=${keyword}`);
    }
  };

  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      gap={2}
      position={'relative'}
      zIndex={2}
    >
      <Input
        bg={'white'}
        width={300}
        placeholder="Kata Kunci: Posisi, Lokasi"
        ref={searchRef}
        onKeyDown={handleSearch}
      />
      <Button
        onClick={handleSearch}
        bg={'custom.blue'}
        _hover={{ bg: 'blue.500' }}
      >
        <SearchIcon color={'white'} />
      </Button>
    </Flex>
  );
};

export default SearchBar;
