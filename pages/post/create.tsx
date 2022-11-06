import Head from 'next/head'
import styles from '../styles/Home.module.scss'

export default function CreatePost() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Post</title>
        <meta name="description" content="Create Post" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Create Post</h1>
      </main>
    </div>
  )
}
