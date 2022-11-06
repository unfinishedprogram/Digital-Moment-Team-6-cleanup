import '../styles/globals.scss'

import type { AppProps } from 'next/app'
import NavBar from '../src/components/general/nav-bar'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ProfileNavBar from '../src/components/general/profile-nav-bar'
import ExplorerNavBar from '../src/components/general/explorer-nav-bar'

export default function App({ Component, pageProps }: AppProps) {
  let router = useRouter()
  let navBar;

  // Changing navbar depending on page
  if (router.pathname == '/user') {
    navBar = <ProfileNavBar />
  } else if (router.pathname == '/explorer') {
    navBar = <ExplorerNavBar />
  } else if (router.pathname == "/") {
    navBar = <></>
  } else {
    navBar = <NavBar />
  }

  return (<>
    <Head>
      <title>Title</title>
      <meta name="description" content="" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {navBar}
    <main>
      <Component {...pageProps} />
    </main>
  </>
  )
}
