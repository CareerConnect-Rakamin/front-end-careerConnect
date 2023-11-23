import customTheme from '@/styles/theme';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <Head>
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
