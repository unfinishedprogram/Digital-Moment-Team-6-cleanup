import Head from 'next/head'
import React, { FormEvent } from 'react';
import Api from '../src/api';
import styles from '../styles/Home.module.scss'
import LocalizedStrings from 'react-localization'

let strings = new LocalizedStrings({
  en:{
    username: "Username",
    email: "Email",
    password: "Password",
    repeat: "Repeat Password",
    age: "What age group are you in?",
    location: "Where are you from ?",
  },
  fr:{
    username: "Nom d'utilisateur",
    email: "Adresse Électronique",
    password: "Mot de passe",
    repeat: "Répéter votre mot de passe",
    age: "Quel groupe d'âge fais-tu partie ?",
    location: "D'où viens-tu",

  }
})
strings.setLanguage('fr')

export default function Register() {
  let emailElement = React.useRef<HTMLInputElement>(null);
  let pswdElement = React.useRef<HTMLInputElement>(null);
  let pswdConfirmElement = React.useRef<HTMLInputElement>(null);
  let usernameElement = React.useRef<HTMLInputElement>(null);
  let ageElement = React.useRef<HTMLSelectElement>(null);
  let locationElement = React.useRef<HTMLInputElement>(null);

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
          <label htmlFor="username">{strings.username}</label>
          <input type="text" id="username" name="username" ref={usernameElement} />
          <label htmlFor="email">{strings.email}</label>
          <input type="email" id="email" name="email" ref={emailElement} />
          <label htmlFor="password">{strings.password}</label>
          <input type="password" id="password" name="password" ref={pswdElement} />
          <label htmlFor="repeat">{strings.repeat}</label>
          <input type="password" id="repeat" name="repeat" ref={pswdConfirmElement} />
          <label htmlFor="age">{strings.age}</label>
          <select ref={ageElement} id="age" name="age">
            <option>8-10</option>
            <option>11-13</option>
            <option>14-15</option>
            <option>16-17</option>
          </select>
          <label htmlFor="location">{strings.location}</label>
          <input type="text" id="location" name="location" ref={locationElement}/>
          <input type="submit" />
        </form>
      </main>
    </div>
  )
}
