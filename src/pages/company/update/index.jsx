import { editCompany, getCompanyById } from '@/modules/fetch';
import customTheme from '@/styles/theme';
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
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { validateToken } from '@/hooks/tokenValidation';

export default function UpdateCompanyForm() {
  return (
    <ChakraProvider theme={customTheme}>
      <Head>
        <title>Edit Company Data</title>
      </Head>
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

const FormInput = (props) => {
  const {
    children,
    type,
    placeholder,
    name,
    required = false,
    defaulValue = '#'
  } = props;
  return (
    <FormControl my={3}>
      <FormLabel>{children}</FormLabel>
      <Input
        type={type}
        bg="#D9D9D9"
        placeholder={placeholder}
        name={name}
        isRequired={required}
        defaultValue={defaulValue}
      />
    </FormControl>
  );
};

const Form1 = () => {
  const [company, setCompany] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const toast = useToast();
  const router = useRouter();

  const checkToken = async () => {
    const user = await validateToken();
    if (user.role == 'company') {
      setUserId(user.id);
    } else {
      router.push('/');
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    const fetchCompanyById = async () => {
      try {
        const response = await getCompanyById(userId);
        setCompany(response.data);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };

    if (userId) {
      fetchCompanyById();
    }
  }, [userId]);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (company) {
      try {
        await editCompany({
          compName: formData.get('name'),
          type: formData.get('type'),
          description: formData.get('description'),
          email_company: formData.get('email_company'),
          website: formData.get('website'),
          phone_number: formData.get('phone_number'),
          address: formData.get('address')
        });
        toast({
          title: 'Success',
          description: 'Data edited successfully',
          status: 'success',
          duration: 5000,
          isClosable: true
        });
        window.location.href = `/profile/company/${userId}`;
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
      <Link href={`/profile/company/${userId}`}>
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
          Update Company
        </Text>
      </Flex>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          placeholder="Nama perusahaan"
          name="name"
          required={true}
          defaulValue={company?.name}
        >
          Nama Perusahaan
        </FormInput>
        <FormControl>
          <FormLabel>Tipe perusahaan</FormLabel>
          <Select
            placeholder="Bergerak dibidang apa perusahaan mu"
            bg="#D9D9D9"
            name="type"
            required
            defaultValue={company?.type}
          >
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="Retail">Retail</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Consulting">Consulting</option>
            <option value="Energy">Energy</option>
          </Select>
        </FormControl>
        <FormInput
          type="text"
          placeholder="masukan deskripsi singkat mengenai perusaan mu"
          name="description"
          defaulValue={company?.description}
        >
          Deskripsi
        </FormInput>
        <FormInput
          type="text"
          placeholder="https://companyofficial.com"
          name="website"
          required={true}
          defaulValue={company?.website}
        >
          Website
        </FormInput>
        <FormInput
          type="text"
          placeholder="company@mail.com"
          name="email_company"
          required={true}
          defaulValue={company?.email_company}
        >
          Email Perusahaan
        </FormInput>
        <FormInput
          type="text"
          placeholder="+62888888"
          name="phone_number"
          defaulValue={company?.phone_number}
          required={true}
        >
          Nomor Telephone
        </FormInput>
        <FormInput
          type="text"
          placeholder="Jl Seokarno no 000"
          name="address"
          defaulValue={company?.address}
          required={true}
        >
          Alamat perusahaan
        </FormInput>
        <Flex mt={5} mb={10} justifyContent="center">
          <Button type="submit" bg="#2A5C91" color="white" minW="55%">
            Update
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
