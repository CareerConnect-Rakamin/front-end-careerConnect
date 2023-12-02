import {
  Box,
  VStack,
  Text,
  HStack,
  FormControl,
  FormLabel,
  useToast,
  Input,
  Button
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { UploadSertif } from '@/modules/fetch';
import Head from 'next/head';

const AddCertificates = () => {
  const [name, setName] = useState(null);
  const [certificates, setCertificates] = useState(null);
  const router = useRouter();
  const toast = useToast();

  const handleCancel = () => {
    router.back();
  };

  const handleAddCertif = async () => {
    if (!certificates) {
      toast({
        title: 'Error',
        description: 'Please insert file certificates',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
    try {
      const formData = new FormData();
      formData.append('file', certificates);
      formData.append('name', name);
      const response = await UploadSertif(formData);
      if (response) {
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Add Certificates</title>
      </Head>
      <Box mt={'2em'} fontFamily={'lexendDeca'} as="aside" color="#0B1A2A">
        <VStack align={'center'}>
          <VStack align={'center'}>
            <Text fontWeight={'bold'} fontSize={'3xl'}>
              Tambah Data Sertifikat
            </Text>
          </VStack>
          <Box
            bg="#F5F5F5"
            color="#0B1A2A"
            w={'60em'}
            h={'auto'}
            borderRadius={'10px'}
          >
            <FormControl mt={'1em'} ml={'1em'} mb={'1em'}>
              <FormLabel fontSize={'xl'}>Nama Sertifikat</FormLabel>
              <Input
                w={'55em'}
                placeholder="Masukkan Nama Sertifikat Anda..."
                _placeholder={{ color: 'gray.500' }}
                fontWeight={'normal'}
                size={'md'}
                variant="outline"
                name="name"
                bgColor={'#F6F4EB'}
                onChange={(e) => {
                  const name = e.target.value;
                  setName(name);
                }}
                required
              />
              <FormLabel fontSize={'xl'} mt={'1em'}>
                File Sertifikat
              </FormLabel>
              <Input
                w={'55em'}
                type="file"
                _placeholder={{ color: 'gray.500' }}
                fontWeight={'normal'}
                size={'md'}
                variant="outline"
                bgColor={'#F6F4EB'}
                accept=".pdf"
                name="sertifName"
                id="certificates"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setCertificates(file);
                }}
                required
              />
              <HStack mt={'2em'}>
                <Button colorScheme="green" onClick={() => handleAddCertif()}>
                  Tambah Sertifikat
                </Button>
                <Button colorScheme="red" onClick={() => handleCancel()}>
                  Batalkan
                </Button>
              </HStack>
            </FormControl>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default AddCertificates;
