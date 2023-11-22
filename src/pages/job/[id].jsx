import Navbar from '@/components/Navbar';
import {
  Box,
  Button,
  Card,
  ChakraProvider,
  Flex,
  Image,
  Link,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function JobById() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <ChakraProvider>
      <Navbar></Navbar>
      <Box mt={70} p={5}>
        <Card bg="#F5F5F5" rounded="10" boxShadow="lg" p={3}>
          <Link href={`/company/jobs/${id}`}>
            <Image
              src="/company-profile/job/detail/back.png"
              _hover={{ transform: 'scale(1.2)' }}
            />
          </Link>
          {/* Header Start */}
          <Text fontSize="35px" fontWeight="bold" px="10px" mt={10}>
            Data Pelamar Pekerjaan
          </Text>
          <Flex justifyContent="space-between" alignItems="center" px="10px">
            <Stack>
              <Flex p={2} alignItems="center" gap="8rem">
                <Stack>
                  <Text fontSize="29px" fontWeight="bold">
                    IT SUPPORT
                  </Text>
                  <Text fontSize="17px" fontWeight="bold">
                    IT, COMPUTER, SOFTWARE ENGINEER
                  </Text>
                </Stack>
                <Stack>
                  <ImageAndTeksInline image="/company-profile/location.png">
                    Serang, Banten
                  </ImageAndTeksInline>
                  <ImageAndTeksInline image="/company-profile/job/detail/gaji.png">
                    2.500.000
                  </ImageAndTeksInline>
                </Stack>
                <Stack>
                  <ImageAndTeksInline image="/company-profile/job/detail/type.png">
                    WFO
                  </ImageAndTeksInline>
                  <ImageAndTeksInline image="/company-profile/job/detail/kuota.png">
                    5 Orang
                  </ImageAndTeksInline>
                </Stack>
              </Flex>
            </Stack>
            <Flex
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
              bg="#0B1A2A"
              rounded="10px"
              p={7}
            >
              <Text color="#C0C0C0" fontSize="21px" fontWeight="normal">
                Jumlah Pelamar Pekerjaan
              </Text>
              <Text color="white" fontSize="30px" fontWeight="bold">
                5 Pelamar
              </Text>
            </Flex>
          </Flex>
          {/* Header end */}

          {/* Table start */}

          <TableContainer rounded="10px" my="10px" py="50px" px="10px">
            <Table>
              <Thead bg="#D9D9D9">
                <Tr>
                  <TheadData>Nama Lengkap</TheadData>
                  <TheadData>Umur</TheadData>
                  <TheadData>Jenis Kelamin</TheadData>
                  <TheadData>Alamat</TheadData>
                  <TheadData>Nomor Telepon</TheadData>
                  <TheadData>CV</TheadData>
                  <TheadData>Portofolio</TheadData>
                  <TheadData>Aksi</TheadData>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <TbodyData>Inal Mahpud</TbodyData>
                  <TbodyData>20</TbodyData>
                  <TbodyData>Pria</TbodyData>
                  <TbodyData>perum srirahayu</TbodyData>
                  <TbodyData>00907643231</TbodyData>
                  <TbodyData>
                    <Link color="#2A5C91">Link CV</Link>
                  </TbodyData>
                  <TbodyData>
                    <Link color="#2A5C91" href="#">
                      Link portofolio
                    </Link>
                  </TbodyData>
                  <TbodyData>
                    <Flex gap={3}>
                      <Link href="#">
                        <Button bg="#459B72" color="white">
                          Chat
                        </Button>
                      </Link>
                      <Select
                        minWidth="100px"
                        p="0"
                        fontSize="12px"
                        fontWeight="bold"
                        color="black"
                        placeholder="Move to"
                      >
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </Select>
                    </Flex>
                  </TbodyData>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>

          {/* Table End */}
        </Card>
      </Box>
    </ChakraProvider>
  );
}

const ImageAndTeksInline = (props) => {
  const {
    image,
    children,
    boxSize = '23px',
    fontSize = '18px',
    textColor = 'black'
  } = props;
  return (
    <Flex gap={2} alignItems="center">
      <Image src={image} boxSize={boxSize} />
      <Text fontSize={fontSize} fontWeight={'semibold'} textColor={textColor}>
        {children}
      </Text>
    </Flex>
  );
};

const TheadData = (props) => {
  const { children } = props;
  return (
    <Th
      color="#0B1A2A"
      fontWeight="bold"
      fontSize="14px"
      border="1px solid #9DA1A6"
    >
      {children}
    </Th>
  );
};

const TbodyData = (props) => {
  const { children } = props;
  return (
    <Td border="1px solid #9DA1A6" fontSize="15px">
      {children}
    </Td>
  );
};
