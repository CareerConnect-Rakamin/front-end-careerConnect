import { SearchIcon } from '@chakra-ui/icons';
import { Button, Flex, Input, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

const SearchBar = () => {
  const searchRef = useRef();
  const router = useRouter();
  const toast = useToast();

  const handleSearch = (event) => {
    const keyword = searchRef.current.value.trim();

    if (event.key === 'Enter' || event.type === 'click') {
      event.preventDefault();

      if (keyword.length < 4) {
        toast({
          title: 'Error',
          description: 'Kata kunci minimal 4 karakter',
          status: 'error',
          duration: 3000,
          isClosable: true
        });
      }

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
