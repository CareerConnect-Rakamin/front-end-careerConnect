import {
  Box,
  VStack,
  Text,
  HStack,
  FormLabel,
  useToast,
  Input,
  Button,
  Textarea,
  Select
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { UpdateProfile } from '@/modules/fetch';

const UpdateDataSeekers = ({ dataProfile }) => {
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      if (dataProfile) {
        await UpdateProfile(
          formData.get('email'),
          formData.get('full_name'),
          formData.get('bio'),
          formData.get('gender'),
          formData.get('phone_number'),
          formData.get('address'),
          formData.get('place_of_birth'),
          formData.get('date_of_birth'),
          formData.get('link_portfolio'),
          formData.get('on_work')
        );
        toast({
          title: 'success',
          description: 'Data berhasil diupdate.',
          status: 'success',
          position: 'top',
          duration: 5000,
          isClosable: true
        });
        router.back();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong',
        position: 'top',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };
  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      <Text align={'center'} fontWeight={'bold'} fontSize={'3xl'} mt={'1em'}>
        Update Data Jobseeker
      </Text>
      <VStack align={'center'} mb={'2em'} mt={'1em'}>
        <Box
          w={'75%'}
          color="#0B1A2A"
          bg="#F5F5F5"
          h={'auto'}
          borderRadius={'10px'}
          p={8}
        >
          {dataProfile && (
            <form onSubmit={handleSubmit}>
              <VStack gap={0} align={'left'}>
                <HStack gap={0}>
                  <VStack align={'left'} w={'50%'} gap={0}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      placeholder="Masukkan Email Anda..."
                      _placeholder={{ color: 'gray.500' }}
                      fontWeight={'normal'}
                      size={'md'}
                      variant="outline"
                      name="email"
                      bgColor={'#F6F4EB'}
                      defaultValue={dataProfile?.email}
                      required
                    />
                  </VStack>
                  <VStack align={'left'} w={'50%'} gap={0} ml={'1em'}>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <Input
                      defaultValue={dataProfile?.full_name}
                      placeholder="Masukkan Nama Lengkap Anda..."
                      _placeholder={{ color: 'gray.500' }}
                      fontWeight={'normal'}
                      size={'md'}
                      variant="outline"
                      name="full_name"
                      bgColor={'#F6F4EB'}
                      required
                    />
                  </VStack>
                </HStack>
                <FormLabel mt={'1em'}>Bio</FormLabel>
                <Textarea
                  placeholder="Masukkan Bio Anda..."
                  _placeholder={{ color: 'gray.500' }}
                  fontWeight={'normal'}
                  size={'md'}
                  variant="outline"
                  name="bio"
                  bgColor={'#F6F4EB'}
                  defaultValue={dataProfile?.bio}
                />
                <HStack gap={0} mt={'1em'}>
                  <VStack gap={0} align={'left'} w={'50%'}>
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <Select
                      placeholder="Pilih Jenis Kelamin Anda..."
                      defaultValue={dataProfile?.gender || ''}
                      _placeholder={{ color: 'gray.500' }}
                      fontWeight={'normal'}
                      size={'md'}
                      variant="outline"
                      name="gender"
                      bgColor={'#F6F4EB'}
                      required
                    >
                      <option value="M">Pria</option>
                      <option value="F">Wanita</option>
                    </Select>
                  </VStack>
                  <VStack gap={0} align={'left'} w={'50%'} ml={'1em'}>
                    <HStack gap={0}>
                      <FormLabel>Nomor Telepon</FormLabel>
                      <Text fontSize={'sm'} color={'red'}>
                        * Gunakan awalan +62
                      </Text>
                    </HStack>
                    <Input
                      type="tel"
                      defaultValue={dataProfile?.phone_number}
                      placeholder="Masukkan Nomor Telepon Anda..."
                      _placeholder={{ color: 'gray.500' }}
                      fontWeight={'normal'}
                      size={'md'}
                      variant="outline"
                      name="phone_number"
                      bgColor={'#F6F4EB'}
                      required
                    />
                  </VStack>
                </HStack>
                <FormLabel mt={'1em'}>Alamat</FormLabel>
                <Input
                  placeholder="Masukkan Alamat Anda..."
                  _placeholder={{ color: 'gray.500' }}
                  fontWeight={'normal'}
                  size={'md'}
                  variant="outline"
                  name="address"
                  bgColor={'#F6F4EB'}
                  defaultValue={dataProfile?.address}
                  required
                />
                <HStack mt={'1em'} gap={0}>
                  <VStack align={'left'} w={'50%'} gap={0}>
                    <FormLabel>Tempat Lahir</FormLabel>
                    <Input
                      placeholder="Masukkan Tempat Lahir Anda..."
                      _placeholder={{ color: 'gray.500' }}
                      fontWeight={'normal'}
                      size={'md'}
                      variant="outline"
                      name="place_of_birth"
                      bgColor={'#F6F4EB'}
                      defaultValue={dataProfile?.place_of_birth}
                      required
                    />
                  </VStack>
                  <VStack align={'left'} w={'50%'} gap={0} ml={'1em'}>
                    <FormLabel>Tanggal Lahir</FormLabel>
                    <Input
                      type="date"
                      placeholder="Masukkan Tanggal Lahir Anda..."
                      _placeholder={{ color: 'gray.500' }}
                      fontWeight={'normal'}
                      size={'md'}
                      variant="outline"
                      name="date_of_birth"
                      bgColor={'#F6F4EB'}
                      defaultValue={
                        dataProfile?.date_of_birth
                          ? new Date(dataProfile?.date_of_birth)
                              .toISOString()
                              .split('T')[0]
                          : ''
                      }
                      required
                    />
                  </VStack>
                </HStack>
                <FormLabel mt={'1em'}>Link Portofolio</FormLabel>
                <Input
                  placeholder="Masukkan Link Portofolio Anda..."
                  _placeholder={{ color: 'gray.500' }}
                  fontWeight={'normal'}
                  size={'md'}
                  variant="outline"
                  name="link_portfolio"
                  bgColor={'#F6F4EB'}
                  defaultValue={dataProfile?.link_portfolio}
                />
                <FormLabel mt={'1em'}>Status Pekerjaan</FormLabel>
                <Select
                  placeholder="Pilih Status Pekerjaan anda sekarang"
                  _placeholder={{ color: 'gray.500' }}
                  fontWeight={'normal'}
                  size={'md'}
                  variant="outline"
                  name="on_work"
                  bgColor={'#F6F4EB'}
                  defaultValue={dataProfile?.on_work || ''}
                  required
                >
                  <option value="true">Sedang Bekerja</option>
                  <option value="false">Sedang Tidak Bekerja</option>
                </Select>
              </VStack>
              <HStack gap={0} mt={'2em'}>
                <Button type="submit" colorScheme="green">
                  Update Data
                </Button>
                <Button
                  ml={'1em'}
                  colorScheme="red"
                  onClick={() => handleCancel()}
                >
                  Batalkan
                </Button>
              </HStack>
            </form>
          )}
        </Box>
      </VStack>
    </>
  );
};

export default UpdateDataSeekers;
