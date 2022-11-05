import Head from 'next/head'
import React, { FormEvent } from 'react';
import Api from '../src/api';
import styles from '../styles/Home.module.scss'

export default function Register() {
  let emailElement = React.useRef<HTMLInputElement>(null);
  let pswdElement = React.useRef<HTMLInputElement>(null);
  let pswdConfirmElement = React.useRef<HTMLInputElement>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let email = emailElement.current!.value;
    let password = pswdElement.current!.value;

    Api.makePostRequest("user/create", { email, password }).then(console.log)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Title</title>
        <meta name="description" content="Register" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Register</h1>
        <form onSubmit={submit}>
          <input type="email" ref={emailElement} />
          <input type="password" ref={pswdElement} />
          <input type="submit" />
        </form>
      </main>
    </div>
  )
}
