import Head from 'next/head'
import styles from '../styles/Home.module.scss'

export default function EditPost() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Edit Post</title>
        <meta name="description" content="Edit Post" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Edit Post</h1>
      </main>
    </div>
  )
}
