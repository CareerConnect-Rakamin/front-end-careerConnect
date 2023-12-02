import { Box, Text, Image, Flex, Link, Divider } from '@chakra-ui/react';
import { MdDeveloperBoard } from 'react-icons/md';
import { FaBoxArchive } from 'react-icons/fa6';

const baseURL = process.env.API_URL || 'http://localhost:3000/api/v1';

const Sidebar = ({ dataUser }) => {
  if (!dataUser) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      fontFamily={'lexendDeca'}
      w="21em"
      h="26em"
      bg="gray.50"
      rounded={'xl'}
      boxShadow={'xl'}
      p={5}
      mx={5}
      my={7}
    >
      {dataUser && (
        <Flex
          direction={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={2}
          mt={10}
        >
          <Image
            src={`${baseURL}/${dataUser.photo_profile}`}
            alt={dataUser?.full_name}
            borderRadius="20px"
            w={125}
            h={125}
          />
          <Text fontSize="2xl" fontWeight="bold">
            {dataUser?.full_name}
          </Text>
        </Flex>
      )}
      <Text fontSize="xl" fontWeight={'semibold'} mt={6}>
        Menu Utama
      </Text>
      <Divider
        borderWidth={'2px'}
        borderColor={'blue.300'}
        rounded={'lg'}
        w={'80%'}
        my={3}
      />
      {dataUser && (
        <Link href={`/profile/jobseeker/${dataUser.jobseekers_id}`}>
          <Flex alignItems={'center'} gap={2} mb={3}>
            <MdDeveloperBoard size={'24px'} />
            <Text fontWeight={'light'}>Dashboard Pengguna</Text>
          </Flex>
        </Link>
      )}
      <Link href={`/profile/jobseeker/jobs/${dataUser.jobseekers_id}`}>
        <Flex alignItems={'center'} gap={2}>
          <FaBoxArchive size={'24px'} />
          <Text fontWeight={'light'}>Data Apply Pekerjaan</Text>
        </Flex>
      </Link>
    </Box>
  );
};

export default Sidebar;
