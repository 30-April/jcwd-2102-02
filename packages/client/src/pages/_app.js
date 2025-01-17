import '../styles/globals.scss'
import { ChakraProvider } from "@chakra-ui/react"
import store from '../redux/store'
import { Provider } from 'react-redux'
import AuthProvider from '../components/Auth/AuthProvider'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </Provider>
  )
}

export default MyApp
