import {
  Button,
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  Text,
  Textarea
} from '@chakra-ui/react';
import { useState } from 'react';

export default function AddJob() {
  const [form1Complete, setForm1Complete] = useState(false);

  const handleForm1Submit = () => {
    setForm1Complete(true);
  };
  return (
    <ChakraProvider>
      <Flex>
        {!form1Complete ? <Form1 onSubmit={handleForm1Submit} /> : <Form2 />}
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
  const { children, type, placeholder } = props;
  return (
    <FormControl my={3}>
      <FormLabel>{children}</FormLabel>
      <Input type={type} bg="#D9D9D9" placeholder={placeholder} required />
    </FormControl>
  );
};

const Form2 = () => {
  return (
    <Flex minW="50%" flexDirection="column" px="40px" my="10px" minH="100vh">
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        mb={4}
      >
        <Text fontSize="30px" fontWeight="bold">
          Requirement
        </Text>
      </Flex>
      <form>
        <FormControl>
          <FormLabel fontWeight="bold" fontSize="24px">
            What will you do
          </FormLabel>
          <Textarea
            placeholder="What will you do"
            size="sm"
            bg="#D9D9D9"
            rounded={10}
            minH="170px"
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="bold" fontSize="24px">
            What will you need
          </FormLabel>
          <Textarea
            placeholder="What will you need"
            size="sm"
            bg="#D9D9D9"
            rounded={10}
            minH="170px"
            required
          />
        </FormControl>
        <Flex mt={5} mb={10} justifyContent="center">
          <Button type="submit" bg="#2A5C91" color="white" minW="55%">
            Tambbahkan
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

const Form1 = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan validasi atau pengolahan data lainnya
    // ...

    // Panggil prop onSubmit untuk memberi tahu parent component bahwa Form1 selesai
    onSubmit();
  };
  return (
    <Flex minW="50%" flexDirection="column" px="40px" my="10px" minH="100vh">
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Text fontSize="30px" fontWeight="bold">
          Tambahkan
        </Text>
        <Text fontSize="30px" fontWeight="bold">
          Lowongan Pekerjaan
        </Text>
      </Flex>
      <form onSubmit={handleSubmit}>
        <FormInput type="text" placeholder="Masukan Judul">
          Judul
        </FormInput>
        <FormInput type="text" placeholder="masukan deskripsi singkat">
          Deskripsi
        </FormInput>
        <FormInput type="" placeholder="masukan deskripsi singkat">
          Deskripsi
        </FormInput>
        <FormControl>
          <FormLabel>Kategori</FormLabel>
          <Select placeholder="Kategori" bg="#D9D9D9" required>
            <option value="Information">Information</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Engineering">Engineering</option>
            <option value="Engineering">Engineering</option>
            <option value="Customer_Service">Customer Service</option>
            <option value="Human_Resources">Human Resources</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Tipe Pekerjaan</FormLabel>
          <Select placeholder="type" bg="#D9D9D9" required>
            <option value="WFH">WFH (Work From Home)</option>
            <option value="WFO">WFO (Work From Office)</option>
          </Select>
        </FormControl>
        <FormInput
          type="number"
          placeholder="masukan jumlah pekerja yang di inginkan"
        >
          Jumlah Pekerja
        </FormInput>
        <FormInput type="text" placeholder="lokasi pekerjaan">
          Lokasi
        </FormInput>
        <FormInput type="number" placeholder="masukan gaji">
          Gaji
        </FormInput>
        <Flex mt={5} mb={10} justifyContent="center">
          <Button type="submit" bg="#2A5C91" color="white" minW="55%">
            lanjutkan
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
