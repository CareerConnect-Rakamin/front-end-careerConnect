import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex, Stack, Text } from '@chakra-ui/react';

const Pagination = ({ page, setPage, lastPage }) => {
  const scrollTop = () => {
    scrollTo({
      top: 550,
      behavior: 'smooth'
    });
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      scrollTop();
    }
  };
  const handleNextPage = () => {
    setPage((prevState) => prevState + 1);
    scrollTop();
  };

  return (
    <Stack px={5} pb={5} mr={'3rem'}>
      <Flex justifyContent={'Flex-end'} gap={3} alignItems={'center'}>
        <Button
          onClick={handlePrevPage}
          isDisabled={page <= 1}
          bg={'custom.blue'}
          color={'white'}
        >
          <ArrowBackIcon fontSize={'md'} />
        </Button>
        <Text fontSize={'md'}>
          {page} of {lastPage}
        </Text>
        <Button
          onClick={handleNextPage}
          isDisabled={page >= lastPage}
          bg={'custom.blue'}
          color={'white'}
        >
          <ArrowForwardIcon fontSize={'md'} />
        </Button>
      </Flex>
    </Stack>
  );
};

export default Pagination;
