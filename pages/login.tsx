import Head from 'next/head'
import styles from '../styles/Home.module.scss'

export default function Login() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Title</title>
        <meta name="description" content="Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Login</h1>
      </main>
    </div>
  )
}
