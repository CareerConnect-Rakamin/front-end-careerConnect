import {
  Flex,
  Image,
  Stack,
  Text,
  VStack,
  useBreakpoint
} from '@chakra-ui/react';
import SearchBar from './SearchBar';

function Hero() {
  return (
    <Flex
      w={'full'}
      h={'90vh'}
      backgroundImage={'/images/hero-image.jpg'}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
    >
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpoint({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}
      >
        <Stack maxW={'3xl'}>
          <Text
            color={'white'}
            fontSize={'3xl'}
            fontWeight={'semibold'}
            textAlign={'center'}
            fontFamily={'lexendDeca'}
          >
            Peluang Karir Menanti, Jelajahi Dunia Pekerjaan dengan Lebih Mudah
            Bersama Kami.
          </Text>
          <SearchBar />
        </Stack>
      </VStack>
    </Flex>
  );
}

export default Hero;
