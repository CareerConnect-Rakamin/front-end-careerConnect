import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Image,
  Link,
  Stack,
  Text
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function SideBar(props) {
  const { photoProfile, companyName } = props;
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      {/* Side Nav Start */}
      <Card
        bg={'#F5F5F5'}
        boxShadow="md"
        mx="auto"
        my="auto"
        h="400px"
        position="fixed"
        minW="320px"
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
          <Stack>
            <Text mt={2} textAlign="left">
              Menu Utama
            </Text>
            <hr style={{ width: '75%', borderTop: '2px solid #2A5C91' }} />
            <ImageAndTeksInline
              image="/company-profile/dashboard.png"
              alt="dashboar.png"
            >
              <Link href={`/profile/company/${id}`}>Dashboard Perusahaan</Link>
            </ImageAndTeksInline>
            <ImageAndTeksInline
              image="/company-profile/info-jobs.png"
              alt="infojobs.png"
            >
              <Link href={`/company/jobs/${id}`}>Data Lowongan Pekerjaan</Link>
            </ImageAndTeksInline>
            <ImageAndTeksInline
              image="/company-profile/add-jobs.png"
              alt="addjobs.png"
            >
              <Link href="/jobs/add">Tambah Data Lowongan</Link>
            </ImageAndTeksInline>
          </Stack>
        </CardBody>
      </Card>
      {/* Side Nav End */}
    </>
  );
}

const ImageAndTeksInline = (props) => {
  const {
    image,
    children,
    boxSize = '23px',
    fontSize = '18px',
    textColor = 'black',
    alt = 'image.png'
  } = props;
  return (
    <Flex gap={2} alignItems="center">
      <Image src={image} boxSize={boxSize} alt={alt} />
      <Text fontSize={fontSize} fontWeight={'semibold'} textColor={textColor}>
        {children}
      </Text>
    </Flex>
  );
};
