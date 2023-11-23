import { Box, Button, Flex, Image, Spacer, Text } from '@chakra-ui/react';

const CardJobVacancy = () => {
  return (
    <>
      <Box
        boxShadow={'xl'}
        width={'260px'}
        h={'300px'}
        rounded={'lg'}
        fontFamily={'lexendDeca'}
        bg={'gray.50'}
      >
        <Flex display={'flex'} justifyContent={'space-between'} padding={3}>
          <Box mr={5}>
            <Image src="/images/rakamin_logo.png" alt="Rakamin" w={'60px'} />
          </Box>
          <Box>
            <Text fontWeight={'thin'} fontSize={'xs'}>
              PT Rakamin Persero Madani
            </Text>
            <Text fontWeight={'semibold'} fontSize={'md'}>
              Magang
            </Text>
          </Box>
        </Flex>
        <Flex px={3}>
          <Text fontWeight={'bold'} fontSize={'2xl'}>
            Software Engineer
          </Text>
        </Flex>
        <Flex p={3} justifyContent={'space-between'}>
          <Box width={'50%'}>
            <Text fontSize={'md'}>Lokasi:</Text>
            <Text fontSize={'xs'} fontWeight={'thin'}>
              DKI Jakarta
            </Text>
          </Box>
          <Box width={'50%'}>
            <Text fontSize={'md'}>Gaji:</Text>
            <Text fontSize={'xs'} fontWeight={'thin'}>
              Rp. 1.000.000
            </Text>
          </Box>
        </Flex>
        <Flex px={3}>
          <Box>
            <Text fontSize={'md'}>Batas Pendaftaran:</Text>
            <Text fontSize={'xs'} fontWeight={'thin'}>
              12 Desember 2023
            </Text>
          </Box>
        </Flex>
        <Flex py={4} px={3}>
          <Button fontSize={'sm'} mr={3}>
            Detail Lowongan
          </Button>
          <Button
            fontSize={'sm'}
            bg={'custom.blue'}
            color={'white'}
            _hover={{ bg: 'blue.400' }}
          >
            Daftar
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default CardJobVacancy;
