import Head from 'next/head'
import styles from '../styles/Home.module.scss'

export default function User() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Title</title>
        <meta name="description" content="User" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>User</h1>
      </main>
    </div>
  )
}
