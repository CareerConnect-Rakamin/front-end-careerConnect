import { Box, Stack } from '@chakra-ui/react';
import Navbar from './Navbar';
import Footer from './Footer';

function Wrapper(props) {
  return (
    <Stack>
      <Navbar />
      <Box marginTop={'64px'}>{props.children}</Box>
      <Footer />
    </Stack>
  );
}

export default Wrapper;
