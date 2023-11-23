import {
  Flex,
  Image,
  Stack,
  Text,
  VStack,
  useBreakpoint
} from '@chakra-ui/react';

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
        bgGradient={'linear(to-r, blackAlpha.500, transparent)'}
      >
        <Stack maxW={'2xl'}>
          <Text color={'white'} fontSize={'4xl'} textAlign={'center'}>
            Menemukan Kesempatan, Membangun Karir yang Sukses
          </Text>
        </Stack>
      </VStack>
    </Flex>
  );
}

export default Hero;
