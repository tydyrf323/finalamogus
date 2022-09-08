import '../styles/globals.css'
import '../styles/compras.css'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {
  return <>
    <Component {...pageProps} />
    <Toaster/>
  </>
}

export default MyApp
