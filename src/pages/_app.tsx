import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { AppContextProvider } from '../components/AppContext'
import { theme } from '../shared/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
