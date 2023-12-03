import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Image,
  Link,
  Stack,
  Text
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdDeveloperBoard } from 'react-icons/md';
import { IoBriefcase } from 'react-icons/io5';
import { RiFileAddFill } from 'react-icons/ri';

export default function SideBar(props) {
  const { photoProfile, companyName } = props;
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      {/* Side Nav Start */}
      <Card
        bg={'gray.50'}
        boxShadow="lg"
        mx="auto"
        my="auto"
        h="400px"
        position="fixed"
        minW="310px"
      >
        <CardHeader p={'10px'}>
          <Flex flexDirection="column" alignItems="center">
            <Image
              src={`http://localhost:3000/api/v1/${photoProfile}`}
              boxSize="125px"
              borderRadius="10px"
              objectFit="cover"
              alt="photo.profile"
            />
            <Text mt={2}>{companyName}</Text>
          </Flex>
        </CardHeader>
        <CardBody p={'10px'}>
          <Stack fontFamily={'lexendDeca'}>
            <Text mt={2} textAlign="left">
              Menu Utama
            </Text>
            <Divider
              borderWidth={'2px'}
              borderColor={'blue.300'}
              rounded={'lg'}
              w={'90%'}
            />
            <Link href={`/profile/company/${id}`}>
              <Flex alignItems={'center'} gap={2}>
                <MdDeveloperBoard size={'24px'} />
                <Text fontSize={'0.9rem'} fontWeight={'light'}>
                  Dashboard Perusahaan
                </Text>
              </Flex>
            </Link>
            <Link href={`/company/jobs/${id}`}>
              <Flex alignItems={'center'} gap={2}>
                <IoBriefcase size={'24px'} />
                <Text fontSize={'0.9rem'} fontWeight={'light'}>
                  Data Lowongan Pekerjaan
                </Text>
              </Flex>
            </Link>
            <Link href="/jobs/add">
              <Flex alignItems={'center'} gap={2}>
                <RiFileAddFill size={'24px'} />
                <Text fontSize={'0.9rem'} fontWeight={'light'}>
                  Tambah Lowongan Pekerjaan
                </Text>
              </Flex>
            </Link>
          </Stack>
        </CardBody>
      </Card>
      {/* Side Nav End */}
    </>
  );
}
