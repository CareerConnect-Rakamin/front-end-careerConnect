import { extendTheme } from '@chakra-ui/react';
import { Lexend_Deca } from '@next/font/google';

const lexendDeca = Lexend_Deca({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800']
});

const customTheme = extendTheme({
  fonts: {
    lexendDeca: lexendDeca.style.fontFamily
  },
  colors: {
    custom: {
      dark_blue: '#112941',
      blue: '#2a5c91',
      grey: '#9da1a6',
      soft_grey: '#c0c0c0',
      ligth_orange: '#ffba79'
    }
  }
});

export default customTheme;
