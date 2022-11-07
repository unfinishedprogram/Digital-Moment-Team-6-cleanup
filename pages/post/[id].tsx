import Head from 'next/head'
import {CommentComponent} from '../../src/components/post/comment'
import styles from '../../styles/Home.module.scss'

interface IComment {
  text:string, 
  children:IComment[]
}



export default function Post() {
  const demoComment = {
    text:"this is nice",
    children: [
      {
        text:"this is nicer",
        children:[]
      }
    ]
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Title</title>
        <meta name="description" content="Post" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Post</h1>
        <CommentComponent commentChildren={demoComment.children} text={demoComment.text}/>
      </main>
    </div>
  )
}
