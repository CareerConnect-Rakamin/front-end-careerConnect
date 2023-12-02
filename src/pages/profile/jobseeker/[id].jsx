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
  Button
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
import Sidebar from '@/components/sidebar.jobseeker';
import { validateToken } from '@/hooks/tokenValidation';

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
      <Navbar />
      <Flex mb={10} pt={'5em'}>
        {dataProfile && <Sidebar dataUser={dataProfile} />}
        <Box
          fontFamily={'lexendDeca'}
          as="aside"
          mt="21px"
          ml="40px"
          w="50.813rem"
          bg="#F5F5F5"
          color="#0B1A2A"
          borderRadius="20px"
          pos={'static'}
          h="auto"
          boxShadow="7px 7px 5px rgba(0, 0, 0, 0.2)"
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
                  <Image
                    src="/images/camera.png"
                    w={'25px'}
                    h={'25px'}
                    filter="invert(1)"
                  />
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
                <Text
                  gap={0}
                  borderBottom="2px solid #2A5C91"
                  mt={0}
                  mb={'1em'}
                  width="46em"
                />
                <Text fontSize={'md'}>{dataProfile.bio}</Text>
                <Text fontSize={'2xl'} fontWeight={'700'} mt={'24px'}>
                  Data Pengguna
                </Text>
                <Text
                  gap={0}
                  borderBottom="2px solid #2A5C91"
                  mt={0}
                  width="46em"
                />
                <Box>
                  <HStack align={'left'}>
                    <HStack>
                      <Image
                        src="/images/phone.png"
                        alt="nomor telepon"
                        w={'30px'}
                        h={'30px'}
                        mt={'27px'}
                      />
                      <Text
                        mt={'28px'}
                        ml={'20px'}
                        fontSize={'lg'}
                        color={
                          dataProfile.phone_number == null
                            ? '#B72E2E'
                            : '#0B1A2A'
                        }
                      >
                        {dataProfile.phone_number != null
                          ? dataProfile.phone_number
                          : 'Data kosong'}
                      </Text>
                    </HStack>
                    <HStack
                      ml={dataProfile.phone_number == null ? '13.7em' : '12em'}
                    >
                      <Image
                        src="/images/calendar.png"
                        alt="nomor telepon"
                        w={'30px'}
                        h={'30px'}
                        mt={'27px'}
                      />
                      <Text mt={'28px'} ml={'20px'} fontSize={'lg'}>
                        {dataProfile.place_of_birth !== null
                          ? `${dataProfile.place_of_birth}, `
                          : ''}
                        {formatDate(dataProfile.date_of_birth)}
                      </Text>
                    </HStack>
                  </HStack>
                  <HStack>
                    <HStack>
                      <Image
                        src="/images/gender.png"
                        alt="nomor telepon"
                        w={'30px'}
                        h={'30px'}
                        mt={'27px'}
                      />
                      <Text mt={'28px'} ml={'20px'} fontSize={'lg'}>
                        {dataProfile.gender === 'M' ? 'Pria' : 'Wanita'}
                      </Text>
                    </HStack>
                    <HStack ml={'18.55em'}>
                      <Image
                        src="/images/www.png"
                        alt="nomor telepon"
                        w={'30px'}
                        h={'30px'}
                        mt={'27px'}
                      />
                      <Text
                        mt={'28px'}
                        ml={'20px'}
                        fontSize={'lg'}
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
                    </HStack>
                  </HStack>
                  <HStack>
                    <HStack>
                      <Image
                        src="/images/location.png"
                        alt="nomor telepon"
                        w={'30px'}
                        h={'30px'}
                        mt={'27px'}
                      />
                      <Text
                        mt={'28px'}
                        ml={'20px'}
                        fontSize={'lg'}
                        color={
                          dataProfile.address == null ? '#B72E2E' : '#0B1A2A'
                        }
                      >
                        {dataProfile.address != null
                          ? dataProfile.address
                          : 'Data Kosong'}
                      </Text>
                    </HStack>
                  </HStack>
                  <Link href={`/profile/jobseeker/edit/`}>
                    <Button
                      bgColor={'#FFBA79'}
                      color={'#0B1A2A'}
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
                <Text
                  gap={0}
                  borderBottom="2px solid #2A5C91"
                  mt={0}
                  width="46em"
                />
                <HStack>
                  <Box
                    mt={'27px'}
                    bgColor={'#FFBA79'}
                    width={'40vh'}
                    height={'15vh'}
                    borderRadius={'10px'}
                    cursor={'pointer'}
                  >
                    <HStack>
                      <VStack align={'left'} gap={0}>
                        <Text
                          fontSize={'sm'}
                          ml={'1em'}
                          mt={'1.5em'}
                          color={'#0B1A2A'}
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
                          color={'#0B1A2A'}
                          ml={'0.7em'}
                          fontSize={'xl'}
                        >
                          PDF
                        </Text>
                      </VStack>
                      <Image
                        src="/images/pdf.png"
                        h={'3em'}
                        mt={'1.3em'}
                        ml={'1.5em'}
                      />
                    </HStack>
                  </Box>
                  <FormControl w={'20%'}>
                    <VStack mt={'27px'} align={'left'} ml={'1em'}>
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
                <Text
                  gap={0}
                  borderBottom="2px solid #2A5C91"
                  mt={0}
                  width="46em"
                />
                <VStack align={'left'} mt={'27px'} gap={0} mb={'5em'}>
                  {certificates?.map((sertif) => {
                    return (
                      <Box
                        key={sertif.id}
                        gap={0}
                        mb={'1em'}
                        h={'5em'}
                        bgColor={'#FFBA79'}
                        p={2}
                        borderRadius={'5px'}
                        boxShadow="5px 5px 4px rgba(0, 0, 0, 0.2)"
                        border="1px solid #000000"
                        _hover={{
                          bgColor: '#FFA959'
                        }}
                      >
                        <HStack align="center" h="100%">
                          <Text
                            textDecoration="underline"
                            cursor={'pointer'}
                            fontSize={'xl'}
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
