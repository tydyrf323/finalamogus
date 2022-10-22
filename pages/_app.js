import '../styles/globals.css'
import '../styles/compras.css'
import '../styles/imprimir.css'
import '../styles/invmain.css'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {
  return <>
    <Component {...pageProps} />
    <Toaster toastOptions={{
    className: '',
    style: {
      border: '3px solid #8F02DF',
      fontWeight: 700,
      background: '#FFBB00',
      color: 'black'
    }
  }}/>
  </>
}

export default MyApp
