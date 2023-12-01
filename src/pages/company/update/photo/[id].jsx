import { UpdatePhoto, editCompany, getCompanyById } from '@/modules/fetch';
import {
  Button,
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Link,
  Select,
  Text,
  Textarea,
  useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function UpdateCompanyForm() {
  return (
    <ChakraProvider>
      <Flex>
        <Form1 />
        <Flex
          bg="#2A5C91"
          minW="50%"
          flexDirection="column"
          alignItems="center"
        >
          <Image
            src="/company-profile/job/logo.png"
            boxSize="115px"
            mt={'6rem'}
            alt="logo.png"
          />
          <Text fontSize="40px" fontWeight="bold" color="white">
            CareerConnect
          </Text>
          <Image
            src="/company-profile/job/homepage.png"
            alt="ilustration.png"
          />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

const Form1 = () => {
  const [company, setCompany] = useState([]);
  const [user, setUser] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;

  // useEffect(() => {
  //   const fetchCompanyById = async () => {
  //     try {
  //       if (id) {
  //         const response = await getCompanyById(id);
  //         setCompany(response.data);
  //         setLoading(false);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //       setLoading(false);
  //     }
  //   };

  //   if (id) {
  //     fetchCompanyById();
  //   }
  // }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();

    // Tambahkan gambar ke formData jika ada
    const fileInput = event.target.image;

    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      formData.append('file', file);
    }

    if (company) {
      try {
        // Menggunakan formData saat memanggil UpdatePhoto
        await UpdatePhoto(formData);

        toast({
          title: 'Success',
          description: 'Photo updated successfully',
          status: 'success',
          duration: 5000,
          isClosable: true
        });
        window.location.href = `/company/${id}`;
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: error.message || 'Something went wrong',
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      }
    }
  }
  return (
    <Flex minW="50%" flexDirection="column" px="40px" my="10px" minH="100vh">
      <Link href={`/profile/company/${id}`}>
        <Image
          src="/company-profile/job/detail/back.png"
          _hover={{ transform: 'scale(1.2)' }}
          alt="back.png"
        />
      </Link>
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Text fontSize="30px" fontWeight="bold">
          Form
        </Text>
        <Text fontSize="30px" fontWeight="bold">
          Update Photo profile
        </Text>
      </Flex>
      <form onSubmit={handleSubmit}>
        {selectedImage && <Image src={selectedImage} alt="not found" />}

        <FormControl>
          <FormLabel>Image</FormLabel>
          <Input
            name="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setSelectedImage(URL.createObjectURL(file));
            }}
          />
        </FormControl>

        <Flex mt={5} mb={10} justifyContent="center">
          <Button type="submit" bg="#2A5C91" color="white" minW="55%">
            Update
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
