import Head from 'next/head'

import Api from '../src/api'
import styles from '../styles/Home.module.scss'
import '../src/pocketbase';

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Title</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Home</h1>
        <button
          onClick={() => Api.makeGetRequest("user/get", {id: "whatever"}).then(v => console.log(v))}
        />
      </main>
    </div>
  )
}
