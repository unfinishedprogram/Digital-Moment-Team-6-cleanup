import '../styles/globals.scss'

import type { AppProps } from 'next/app'
import NavBar from '../src/components/general/nav-bar'
import CustomFooter from '../src/components/general/custom-footer'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (<>
    <Head>
      <title>Title</title>
      <meta name="description" content="" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <NavBar />
    <main>
      <Component {...pageProps} />
      <CustomFooter />
    </main>
  </>
  )
}
