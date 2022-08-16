import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    body: `'Roboto', sans-serif`,
    heading: `'Roboto', sans-serif`
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: '#004ECC',
          color: '#fff',
          fontSize: '0.875rem',
          fontWeight: '500',
          height: '3rem'
        }
      }
    }
  }
})
