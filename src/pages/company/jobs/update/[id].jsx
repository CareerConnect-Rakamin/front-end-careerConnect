import { getJobById, updateJob } from '@/modules/fetch';
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
  Skeleton,
  Text,
  Textarea,
  useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

export default function UpdateJobCompanyForm() {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;
  const [userId, setUserId] = useState(null);

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const decodeToken = jwt.decode(token);

  useEffect(() => {
    const fetchJobById = async () => {
      if (formData.name && formData.what_will_you_do) {
        console.log('ini terpanggil');
        try {
          await updateJob(id, formData);

          toast({
            title: 'Success',
            description: 'Job updated successfully',
            status: 'success',
            duration: 5000,
            isClosable: true
          });
          window.location.href = `/company/jobs/${userId}`;
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
    };

    if (decodeToken) {
      setUserId(decodeToken.id);
    }
    if (id) {
      fetchJobById();
    }
  }, [formData]);

  return (
    <ChakraProvider>
      <Flex>
        {currentStep === 1 && (
          <Form1
            onNext={() => {
              setCurrentStep(2);
            }}
            updateFormData={(data) => setFormData({ ...formData, ...data })}
          />
        )}
        {currentStep === 2 && (
          <Form2
            updateFormData={(data) => setFormData({ ...formData, ...data })}
          />
        )}
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

const Form1 = ({ onNext, updateFormData }) => {
  const [job, setJob] = useState([]);
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;

  const [userId, setUserId] = useState(null);

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const decodeToken = jwt.decode(token);

  useEffect(() => {
    const fetchJobById = async () => {
      try {
        if (id) {
          const response = await getJobById(id);
          setJob(response.data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (decodeToken) {
      setUserId(decodeToken.id);
    }

    if (id) {
      fetchJobById();
    }
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (job) {
      try {
        updateFormData({
          name: formData.get('name'),
          description: formData.get('description'),
          type: formData.get('type'),
          location: formData.get('location'),
          job_type: formData.get('job_type'),
          salary: formData.get('salary'),
          capacity: formData.get('capacity')
        });

        onNext(); // Pindah ke langkah berikutnya
      } catch (error) {
        console.error(error);
        // Tambahkan penanganan kesalahan jika diperlukan
      }
    }
  }

  const jobCategories = [
    'Information',
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Sales',
    'Marketing',
    'Engineering',
    'Customer_Service',
    'Human_Resources',
    'Energy',
    'Food',
    'Automotive',
    'Fashion',
    'Construction'
  ];
  return (
    <Flex minW="50%" flexDirection="column" px="40px" my="10px" minH="100vh">
      <Link href={`/company/jobs/${userId}`}>
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
          Update Job
        </Text>
      </Flex>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          placeholder="email for login"
          name="name"
          required={true}
          defaulValue={job.name}
        >
          Nama pekerjaan
        </FormInput>
        <FormInput
          type="text"
          placeholder="Nama perusahaan"
          name="description"
          required={true}
          defaulValue={job.description}
        >
          Deskripsi singkat
        </FormInput>
        <FormControl>
          <FormLabel>Kategoti Pekerjaan</FormLabel>
          <Select
            placeholder="Kategori pekerjaan"
            bg="#D9D9D9"
            name="type"
            required
            defaultValue={job.category}
          >
            {jobCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormInput
          type="text"
          placeholder="Lokasi Pekerjaan"
          name="location"
          defaulValue={job.location}
        >
          Lokasi
        </FormInput>
        <FormControl>
          <FormLabel>Tipe Pekerjaan</FormLabel>
          <Select
            placeholder="Tipe Pekerjaan"
            bg="#D9D9D9"
            name="job_type"
            required
            defaultValue={job.type}
          >
            <option value="WFH">WFH (Work From Home)</option>
            <option value="WFO">WFO (Work From Office)</option>
          </Select>
        </FormControl>
        <FormInput
          type="number"
          placeholder="Gaji"
          name="salary"
          required={true}
          defaulValue={job.salary}
        >
          Salary
        </FormInput>
        <FormInput
          type="number"
          placeholder="Berapa orang yang ingin di Hiring"
          name="capacity"
          defaulValue={job.capacity}
          required={true}
        >
          Capacity
        </FormInput>
        <Flex mt={5} mb={10} justifyContent="center">
          <Button type="submit" bg="#2A5C91" color="white" minW="55%">
            Lanjutkan
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

const Form2 = ({ updateFormData }) => {
  const [job, setJob] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchJobById = async () => {
      try {
        if (id) {
          const response = await getJobById(id);
          setJob(response.data);
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (id) {
      fetchJobById();
    }
  }, [id]);
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (job) {
      try {
        updateFormData({
          what_will_you_do: formData.get('what_will_you_do'),
          what_will_you_need: formData.get('what_will_you_need')
        });

        // Tidak perlu onNext() karena ini adalah langkah terakhir
      } catch (error) {
        console.error(error);
        // Tambahkan penanganan kesalahan jika diperlukan
      }
    }
  }

  return (
    <Flex minW="50%" flexDirection="column" px="40px" my="10px" minH="100vh">
      <Link href={`/company/jobs/update/${id}`}>
        <Image
          src="/company-profile/job/detail/back.png"
          _hover={{ transform: 'scale(1.2)' }}
          alt="back.png"
        />
      </Link>
      <form onSubmit={handleSubmit}>
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Text fontSize="30px" fontWeight="bold">
            Form
          </Text>
          <Text fontSize="30px" fontWeight="bold">
            Update Job
          </Text>
        </Flex>

        <FormControl>
          <FormLabel>What will you do</FormLabel>
          <Textarea
            placeholder="what will you do"
            size="xl"
            bg="#D9D9D9"
            rounded={10}
            minH="10rem"
            name="what_will_you_do"
            defaultValue={job.what_will_you_do}
          />
        </FormControl>

        <FormControl>
          <FormLabel>What will you need</FormLabel>
          <Textarea
            name="what_will_you_need"
            placeholder="What will you need"
            size="xl"
            bg="#D9D9D9"
            rounded={10}
            minH="10rem"
            defaultValue={job.what_will_you_need}
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
