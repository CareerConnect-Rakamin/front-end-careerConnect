import {
  Box,
  VStack,
  Text,
  Image,
  HStack,
  FormControl,
  useToast,
  Input,
  Flex,
  Button,
  Divider,
  Spacer
} from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  GetProfileById,
  UpdatePhoto,
  UploadCV,
  DeleteCV,
  DeleteSertif
} from '@/modules/fetch';
import Sidebar from '@/components/SidebarJobseeker';
import { validateToken } from '@/hooks/tokenValidation';
import Head from 'next/head';
import { MdAddAPhoto } from 'react-icons/md';
import { CalendarIcon, PhoneIcon } from '@chakra-ui/icons';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { TbWorld } from 'react-icons/tb';
import { IoLocationSharp } from 'react-icons/io5';
import { FaFilePdf } from 'react-icons/fa6';

const baseURL = process.env.API_URL || 'http://localhost:3000/api/v1';

const ProfileJobseeker = () => {
  const [dataProfile, setDataProfile] = useState(null);
  const [certificates, setCertificates] = useState(null);
  const [image, setImage] = useState(null);
  const [cv, setCV] = useState(null);
  const router = useRouter();
  const id = router.query.id;
  const toast = useToast();

  const handleImageChange = async () => {
    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      try {
        const response = await UpdatePhoto(formData);
        if (response) {
          if (response) {
            toast({
              title: 'success',
              description: 'Foto profile berhasil diupload.',
              status: 'success',
              position: 'top',
              duration: 5000,
              isClosable: true
            });
            setCV(null);

            setTimeout(() => {
              router.reload();
            }, 1000);
          }
        }
      } catch (error) {
        console.error('Error updating photo:', error);
      }
    }
  };

  const handleCV = async () => {
    try {
      if (cv) {
        const formData = new FormData();
        formData.append('file', cv);
        const response = await UploadCV(formData);
        if (response) {
          toast({
            title: 'success',
            description: 'CV berhasil ditambahkan.',
            status: 'success',
            duration: 5000,
            position: 'top',
            isClosable: true
          });
          setCV(null);

          setTimeout(() => {
            router.reload();
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getDataProfile = async () => {
      try {
        if (id) {
          const response = await GetProfileById(id);
          setDataProfile(response.data.dataProfile);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getCertificates = async () => {
      try {
        if (id) {
          const response = await GetProfileById(id);
          setCertificates(response.data.certificate);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const checkToken = () => {
      const idUser = id;
      if (idUser) {
        const result = validateToken();
        if (!result) {
          localStorage.removeItem('token');
          router.push('/');
        }
        const { id, role } = result;
        const idToken = id;
        if (idToken != idUser) {
          router.push(`/`);
        }
      }
    };
    if (cv) {
      handleCV();
    }
    if (image) {
      handleImageChange();
    }
    getDataProfile();
    getCertificates();
    checkToken();
  }, [id, cv, image]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  if (!dataProfile) {
    return <div>Loading...</div>;
  }

  const deleteCV = async () => {
    try {
      if (dataProfile.cv_path) {
        const response = await DeleteCV();
        if (response) {
          if (response) {
            toast({
              title: 'success',
              description: 'CV berhasil dihapus.',
              status: 'success',
              duration: 5000,
              position: 'top',
              isClosable: true
            });

            setTimeout(() => {
              router.reload();
            }, 1000);
          }
        }
      } else {
        toast({
          title: 'CV belum diupload',
          description: 'Upload CV terlebih dahulu.',
          status: 'error',
          duration: 5000,
          position: 'top',
          isClosable: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCertif = async (id) => {
    try {
      if (id) {
        const response = await DeleteSertif(id);
        if (response) {
          toast({
            title: 'success',
            description: 'Sertifikat berhasil dihapus.',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top'
          });

          setTimeout(() => {
            router.reload();
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Profile Jobseeker</title>
      </Head>
      <Navbar />
      <Flex mb={10} pt={'5em'}>
        {dataProfile && <Sidebar dataUser={dataProfile} />}
        <Box
          fontFamily={'lexendDeca'}
          w="50.813rem"
          bg={'gray.50'}
          rounded={'xl'}
          boxShadow={'xl'}
          h="auto"
          my={7}
          mx={5}
        >
          <Flex>
            {dataProfile && (
              <HStack>
                <Image
                  src={`${baseURL}/${dataProfile.photo_profile}`}
                  alt={dataProfile.full_name}
                  borderRadius="360px"
                  w={'150px'}
                  h={'148px'}
                  ml={'26px'}
                  mt={'22px'}
                />
                <Box
                  bgColor={'#2A5C91'}
                  w={'50px'}
                  h={'50px'}
                  align={'center'}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="360px"
                  pos={'absolute'}
                  ml={'137px'}
                  mt={'120px'}
                  cursor={'pointer'}
                  _hover={{
                    bgColor: '#214973'
                  }}
                  onClick={() => {
                    const inputFile = document.getElementById('fileInput');
                    inputFile.click();
                  }}
                >
                  <Input
                    name="image"
                    type="file"
                    accept="image/*"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setImage(file);
                    }}
                  />
                  <MdAddAPhoto size={25} color="white" />
                </Box>
              </HStack>
            )}
            {dataProfile && (
              <VStack align={'left'} ml={'38px'} mt={'64px'} gap={0}>
                <Text fontSize={'3xl'} fontWeight={'700'} m={0}>
                  {dataProfile.full_name}
                </Text>
                <Text fontSize={'sm'} m={0} color={'#9DA1A6'}>
                  {dataProfile.email}
                </Text>
              </VStack>
            )}
          </Flex>
          {dataProfile && (
            <>
              <VStack
                align={'left'}
                gap={0}
                ml={'26px'}
                mt={'33px'}
                mr={'40px'}
              >
                <Text fontSize={'2xl'} fontWeight={'700'}>
                  Bio Pengguna
                </Text>
                <Divider
                  borderWidth={'1px'}
                  borderColor={'blue.400'}
                  rounded={'lg'}
                  my={1}
                />
                <Text fontSize={'md'} fontWeight={'light'}>
                  {dataProfile.bio}
                </Text>
                <Text fontSize={'2xl'} fontWeight={'700'} mt={'24px'}>
                  Data Pengguna
                </Text>
                <Divider
                  borderWidth={'1px'}
                  borderColor={'blue.400'}
                  rounded={'lg'}
                  my={1}
                />
                <Box>
                  <Flex justifyContent={'space-between'} width={'500px'} mt={3}>
                    <Flex alignItems={'center'} gap={3}>
                      <PhoneIcon fontSize={20} />
                      <Text
                        fontSize={'lg'}
                        fontWeight={'light'}
                        color={
                          dataProfile.phone_number === null
                            ? '#B72E2E'
                            : '#0B1A2A'
                        }
                      >
                        {dataProfile.phone_number !== null
                          ? dataProfile.phone_number
                          : 'Data kosong'}
                      </Text>
                    </Flex>
                    <Flex alignItems={'center'} gap={3}>
                      <CalendarIcon />
                      <Text fontSize={'lg'} fontWeight={'light'}>
                        {dataProfile.place_of_birth !== null
                          ? `${dataProfile.place_of_birth}, `
                          : ''}
                        {formatDate(dataProfile.date_of_birth)}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex justifyContent={'space-between'} width={'515px'} mt={3}>
                    <Flex alignItems={'center'} gap={3}>
                      <BsGenderAmbiguous size={25} />
                      <Text fontSize={'lg'} fontWeight={'light'}>
                        {dataProfile.gender === 'M' ? 'Pria' : 'Wanita'}
                      </Text>
                    </Flex>
                    <Flex alignItems={'center'} gap={2}>
                      <TbWorld size={25} />
                      <Text
                        fontSize={'lg'}
                        fontWeight={'light'}
                        color={
                          dataProfile.link_portfolio == null
                            ? '#B72E2E'
                            : '#0B1A2A'
                        }
                      >
                        {dataProfile.link_portfolio != null
                          ? `${dataProfile.link_portfolio}`
                          : 'Data Kosong'}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex mt={3}>
                    <Flex alignItems={'center'} gap={3}>
                      <IoLocationSharp size={25} />
                      <Text
                        fontSize={'lg'}
                        fontWeight={'light'}
                        color={
                          dataProfile.address == null ? '#B72E2E' : '#0B1A2A'
                        }
                      >
                        {dataProfile.address != null
                          ? dataProfile.address
                          : 'Data Kosong'}
                      </Text>
                    </Flex>
                  </Flex>
                  <Link href={`/profile/jobseeker/edit/`}>
                    <Button
                      bgColor={'orange.400'}
                      color={'white'}
                      size={'md'}
                      w={'13.563em'}
                      mt={'1.688rem'}
                      _hover={{
                        bgColor: '#FFA959'
                      }}
                    >
                      Update Data Profile
                    </Button>
                  </Link>
                </Box>
                <Text fontSize={'2xl'} fontWeight={'700'} mt={'24px'}>
                  Resume CV
                </Text>
                <Divider
                  borderWidth={'1px'}
                  borderColor={'blue.400'}
                  rounded={'lg'}
                  my={2}
                />
                <HStack>
                  <Box
                    bgColor={'blue.500'}
                    width={'40vh'}
                    height={'15vh'}
                    borderRadius={'10px'}
                    cursor={'pointer'}
                  >
                    <HStack>
                      <VStack align={'left'} p={4}>
                        <Text
                          fontSize={'md'}
                          fontWeight={'normal'}
                          color={'white'}
                          _hover={{
                            textDecoration: 'underline',
                            cursor: 'pointer'
                          }}
                          onClick={() => {
                            if (dataProfile.cv_path) {
                              window.open(
                                `${baseURL}/${dataProfile.cv_path}`,
                                '_blank'
                              );
                            } else {
                              toast({
                                title: 'CV belum diupload',
                                description: 'Upload CV terlebih dahulu.',
                                status: 'error',
                                duration: 5000,
                                isClosable: true
                              });
                            }
                          }}
                        >
                          {dataProfile.cv_path != null
                            ? 'CV Sudah Di upload'
                            : 'CV Belum Di upload'}
                        </Text>
                        <Text
                          fontWeight={'bold'}
                          color={'white'}
                          fontSize={'xl'}
                        >
                          PDF
                        </Text>
                      </VStack>
                      <FaFilePdf size={45} color={'white'} />
                    </HStack>
                  </Box>
                  <FormControl w={'20%'}>
                    <VStack align={'left'} ml={'1em'}>
                      <Button
                        colorScheme="green"
                        onClick={() => {
                          const inputFile = document.getElementById('cv');
                          inputFile.click();
                        }}
                      >
                        {dataProfile.cv_path != null
                          ? 'Update CV'
                          : 'Upload CV'}
                      </Button>
                      <Input
                        type="file"
                        accept=".pdf"
                        id="cv"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setCV(file);
                        }}
                      />
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          deleteCV();
                        }}
                      >
                        Delete CV
                      </Button>
                    </VStack>
                  </FormControl>
                </HStack>
                <Text fontSize={'2xl'} fontWeight={'700'} mt={'1.5em'}>
                  Resume Sertifikat
                </Text>
                <Divider
                  borderWidth={'1px'}
                  borderColor={'blue.400'}
                  rounded={'lg'}
                  my={1}
                />
                <VStack align={'left'} mt={'27px'} gap={0} mb={'5em'}>
                  {certificates?.map((sertif) => {
                    return (
                      <Box
                        key={sertif.id}
                        mb={'1em'}
                        h={'5em'}
                        bgColor={'blue.500'}
                        p={2}
                        borderRadius={'lg'}
                        boxShadow={'lg'}
                        _hover={{
                          bgColor: 'blue.400'
                        }}
                      >
                        <HStack align="center" h="100%">
                          <Text
                            cursor={'pointer'}
                            fontSize={'xl'}
                            color={'gray.100'}
                            ml={'1em'}
                            _hover={{
                              color: '#2A5C91'
                            }}
                            onClick={() => {
                              window.open(
                                `${baseURL}/${sertif.path}`,
                                '_blank'
                              );
                            }}
                          >
                            Sertifikat {sertif.name}
                          </Text>
                          <Button
                            ml={'auto'}
                            mr={'0.5em'}
                            colorScheme="red"
                            onClick={() => deleteCertif(sertif.id)}
                          >
                            Hapus Sertifikat
                          </Button>
                        </HStack>
                      </Box>
                    );
                  })}
                  <HStack align={'left'} mt={'1em'}>
                    <Link href={`certificates`}>
                      <Button colorScheme="green">Tambah Sertifikat</Button>
                    </Link>
                  </HStack>
                </VStack>
              </VStack>
            </>
          )}
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export default ProfileJobseeker;
