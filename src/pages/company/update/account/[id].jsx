import { editCompany, getCompanyById } from '@/modules/fetch';
import {
  Button,
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Link,
  Text,
  useToast
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function UpdateCompanyForm() {
  return (
    <ChakraProvider>
      <Head>
        <title>Edit Company Account</title>
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
    defaulValue = ''
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
  const [user, setUser] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchCompanyById = async () => {
      try {
        if (id) {
          const response = await getCompanyById(id);
          setCompany(response.data);
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };

    if (id) {
      fetchCompanyById();
    }
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (company) {
      if (formData.get('password') !== formData.get('confirm_password')) {
        toast({
          title: 'Failed',
          description: 'Password Tidak sesuai',
          status: 'error',
          duration: 5000,
          isClosable: true
        });
        return;
      }
      try {
        await editCompany(formData.get('email'), formData.get('password'));
        toast({
          title: 'Success',
          description: 'Account edited successfully',
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
          Update Account Company
        </Text>
      </Flex>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          placeholder="email for login"
          name="email"
          required={true}
          defaulValue={company.email}
        >
          Email
        </FormInput>
        <FormInput
          type="password"
          placeholder="new password"
          name="password"
          required={true}
        >
          password
        </FormInput>
        <FormInput
          type="password"
          placeholder="Confirm password"
          name="confirm_password"
          required={true}
        >
          Confirm password
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
