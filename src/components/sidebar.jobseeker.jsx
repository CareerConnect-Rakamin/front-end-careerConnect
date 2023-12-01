import { Box, VStack, Text, Image, HStack } from '@chakra-ui/react';
import Link from 'next/link';

const baseURL = process.env.API_URL || 'http://localhost:3000/api/v1';

const Sidebar = ({ dataUser }) => {
  const image = dataUser?.photo_profile;
  const id = dataUser?.id;
  if (!dataUser) {
    return <div>Loading...</div>;
  }

  console.log(dataUser)
  console.log(dataUser.photo_profile)

  return (
    <Box
      fontFamily={'lexendDeca'}
      as="aside"
      mt="21px"
      ml="21px"
      w="22.875em"
      bg="#F5F5F5"
      color="#0B1A2A"
      borderRadius="20px"
      pos={'sticky'}
      h="30.688em"
      boxShadow="7px 7px 5px rgba(0, 0, 0, 0.2)"
    >
      <VStack align="center" gap={0}>
        {dataUser && (
          <>
            <Image
              src={`${baseURL}/${dataUser.photo_profile}`}
              alt={dataUser?.full_name}
              borderRadius="20px"
              w={125}
              h={125}
              mb={0}
              mt={'47px'}
            />
            <Text fontSize="2xl" fontWeight="bold" mt={0} mb={0} gap={0}>
              {dataUser?.full_name}
            </Text>
          </>
        )}
      </VStack>
      <VStack align="left" mt={17} gap={0} ml={'12px'}>
        <Text mb={0} fontSize="xl">
          Menu Utama
        </Text>
        <Text
          gap={0}
          borderBottom="1.5px solid #2A5C91"
          mt={0}
          mb={0}
          width="18em"
        />
      </VStack>
      {dataUser && (
        <Link href={`/user/profile/${dataUser.jobseekers_id}`}>
          <HStack
            align={'left'}
            mt="8px"
            mb={0}
            gap={0}
            w={'auto'}
            pl={'12px'}
            cursor={'pointer'}
            _hover={{
              bgColor: '#2A5C91',
              color: '#F5F5F5',
              '& img': {
                filter: 'invert(100%)'
              }
            }}
            pt={'11px'}
            pb={'11px'}
          >
            <Image
              src="/images/dashboard2.png"
              w="22px"
              h="22px"
              color="blue.500"
            />
            <Text pl={'9px'}>Dashboard Pengguna</Text>
          </HStack>
        </Link>
      )}
      <Link href={`/user/profile/jobs/${dataUser.jobseekers_id}`}>
        <HStack
          align={'left'}
          mb={0}
          gap={0}
          w={'auto'}
          pl={'12px'}
          cursor={'pointer'}
          _hover={{
            bgColor: '#2A5C91',
            color: '#F5F5F5',
            '& img': {
              filter: 'invert(100%)'
            }
          }}
          pt={'11px'}
          pb={'11px'}
        >
          <Image src="/images/job.png" w="22px" h="22px" color="blue.500" />
          <Text pl={'9px'}>Data Apply Pekerjaan</Text>
        </HStack>
      </Link>
    </Box>
  );
};

export default Sidebar;
