import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';

const CardJobVacancy = ({ job }) => {
  const formattedSalary = `${Number(job.salary).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`;
  return (
    <Box
      boxShadow={'xl'}
      width={'260px'}
      height={'310px'}
      rounded={'lg'}
      fontFamily={'lexendDeca'}
      bg={'gray.50'}
    >
      <Flex display={'flex'} justifyContent={'flex-start'} padding={3}>
        <Box mr={5}>
          <Image src="/images/rakamin_logo.png" alt="Rakamin" maxW={'50px'} />
        </Box>
        <Box>
          <Text fontWeight={'thin'} fontSize={'xs'}>
            {job.company_name}
          </Text>
          <Text fontWeight={'semibold'} fontSize={'md'} noOfLines={1}>
            {job.description}
          </Text>
        </Box>
      </Flex>
      <Flex px={3} mt={1}>
        <Text fontWeight={'bold'} fontSize={'xl'} noOfLines={1}>
          {job.name}
        </Text>
      </Flex>
      <Flex p={3} justifyContent={'space-between'}>
        <Box width={'50%'}>
          <Text fontSize={'md'}>Lokasi:</Text>
          <Text fontSize={'xs'} fontWeight={'thin'} noOfLines={2}>
            {job.location}
          </Text>
        </Box>
        <Box width={'50%'} ml={1}>
          <Text fontSize={'md'}>Gaji:</Text>
          <Text fontSize={'xs'} fontWeight={'thin'}>
            {formattedSalary}
          </Text>
        </Box>
      </Flex>
      <Flex px={3}>
        <Box>
          <Text fontSize={'md'}>Kapasitas:</Text>
          <Text fontSize={'xs'} fontWeight={'thin'}>
            {job.capacity} Lowongan
          </Text>
        </Box>
      </Flex>
      <Flex py={4} px={3} justifyContent={'center'} mt={1}>
        <Button
          fontSize={'sm'}
          bg={'custom.blue'}
          color={'white'}
          _hover={{ bg: 'blue.400' }}
        >
          Detail Lowongan
        </Button>
      </Flex>
    </Box>
  );
};

export default CardJobVacancy;
