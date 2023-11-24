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
      try {
        await editCompany(
          id,
          formData.get('email'),
          formData.get('password'),
          formData.get('name'),
          formData.get('type'),
          formData.get('description'),
          formData.get('website'),
          formData.get('email_company'),
          formData.get('phone_number'),
          formData.get('address')
        );
        toast({
          title: 'Success',
          description: 'Book edited successfully',
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
      <Link href={`/company/${id}`}>
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
          Form Update Comapany
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
          Email untuk login
        </FormInput>
        <FormInput
          type="text"
          placeholder="new password"
          name="password"
          required={true}
        >
          password baru untuk login
        </FormInput>
        <FormInput
          type="text"
          placeholder="Nama perusahaan"
          name="name"
          required={true}
          defaulValue={company.name}
        >
          Nama Company
        </FormInput>
        <FormControl>
          <FormLabel>Tipe perusahaan</FormLabel>
          <Select
            placeholder="Bergerak dibidang apa perusahaan mu"
            bg="#D9D9D9"
            name="type"
            required
            defaultValue={company.type}
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
          defaulValue={company.description}
        >
          Deskripsi
        </FormInput>
        <FormInput
          type="text"
          placeholder="https://companyofficial.com"
          name="website"
          required={true}
          defaulValue={company.website}
        >
          Website
        </FormInput>
        <FormInput
          type="text"
          placeholder="company@mail.com"
          name="email_company"
          required={true}
          defaulValue={company.email_company}
        >
          Email Perusahaan
        </FormInput>
        <FormInput
          type="text"
          placeholder="+62888888"
          name="phone_number"
          defaulValue={company.phone_number}
          required={true}
        >
          Nomor Telephone
        </FormInput>
        <FormInput
          type="text"
          placeholder="Jl Seokarno no 000"
          name="address"
          defaulValue={company.address}
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
