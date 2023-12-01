import {
  Box,
  Image,
  Heading,
  Text,
  Flex,
  Tooltip,
  Link
} from '@chakra-ui/react';
import { FiInfo, FiAlignLeft } from 'react-icons/fi';
import { BiBuilding } from 'react-icons/bi';
import { useRouter } from 'next/router';

const CompanyCard = ({
  name,
  address,
  type,
  company_id,
  photo_profile,
  description
}) => {
  return (
    <Link
      href={`/companies-detail/${company_id}`}
      style={{ textDecoration: 'none' }}
    >
      <Box
        maxW="sm"
        borderWidth="2px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        boxShadow="md"
        cursor="pointer"
        transition="transform 0.1s"
        _hover={{
          transform: 'scale(1.05)',
          boxShadow: 'lg'
        }}
      >
        <Box>
          <Flex alignItems="center">
            <Image
              src={`http://localhost:3000/api/v1/${photo_profile}`}
              alt={name}
              mb={4}
              maxW={'50px'}
              noOfLines={2}
            />
            <Flex direction="column" ml={4}>
              <Heading as="h2" size="md">
                {name}
              </Heading>
              <Flex>
                <Text color="#2A5C91">{address}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>

        <Flex alignItems="center" mb={2}>
          <BiBuilding size={20} />
          <Text ml={2}>{type}</Text>
        </Flex>

        <Flex alignItems="center" mb={4}>
          <FiAlignLeft size={40} />
          <Tooltip
            label={description}
            placement="bottom"
            hasArrow
            bg="#2A5C91"
            color="white"
            borderRadius="8px"
          >
            <Text ml={2} noOfLines={1}>
              {description}
            </Text>
          </Tooltip>
        </Flex>
      </Box>
    </Link>
  );
};

export default CompanyCard;
