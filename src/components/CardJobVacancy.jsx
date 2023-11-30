import { Box, Button, Flex, Image, Text, Tooltip } from '@chakra-ui/react';
import Link from 'next/link';

const CardJobVacancy = ({ job }) => {
  const formattedSalary = `${Number(job.salary).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`;

  return (
    <Link href={`/jobs/details/${job.id}`}>
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
            <Image
              src={`http://localhost:3000/api/v1/${job.company_photo}`}
              alt="Company Logo"
              maxW={'50px'}
              noOfLines={2}
            />
          </Box>
          <Box>
            <Text fontWeight={'normal'} fontSize={'xs'}>
              {job.company_name}
            </Text>
            <Tooltip
              label={job.description}
              placement="bottom"
              bg={'custom.blue'}
              rounded={'lg'}
            >
              <Text fontWeight={'semibold'} fontSize={'md'} noOfLines={1}>
                {job.description}
              </Text>
            </Tooltip>
          </Box>
        </Flex>
        <Flex px={3} mt={1}>
          <Tooltip
            label={job.name}
            placement="bottom"
            bg={'custom.blue'}
            rounded={'lg'}
          >
            <Text fontWeight={'bold'} fontSize={'xl'} noOfLines={1}>
              {job.name}
            </Text>
          </Tooltip>
        </Flex>
        <Flex p={3} justifyContent={'space-between'}>
          <Box width={'50%'}>
            <Text fontSize={'md'}>Lokasi:</Text>
            <Tooltip
              label={job.location}
              placement="bottom"
              bg={'custom.blue'}
              rounded={'lg'}
            >
              <Text fontSize={'xs'} fontWeight={'light'} noOfLines={1}>
                {job.location}
              </Text>
            </Tooltip>
          </Box>
          <Box width={'50%'} ml={1}>
            <Text fontSize={'md'}>Gaji:</Text>
            <Text fontSize={'xs'} fontWeight={'light'}>
              {formattedSalary}
            </Text>
          </Box>
        </Flex>
        <Flex px={3}>
          <Box>
            <Text fontSize={'md'}>Kapasitas:</Text>
            <Text fontSize={'xs'} fontWeight={'light'}>
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
    </Link>
  );
};

export default CardJobVacancy;
