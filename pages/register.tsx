import Head from 'next/head'
import React, { FormEvent, ChangeEvent,  useState } from 'react';
import Api from '../src/api';
import styles from '../styles/Home.module.scss'
import input_styles from "../styles/input.module.scss"
import {useFormik} from 'formik';
import { strings } from '../src/localization/localization'
import ButtonConfirm from '../src/components/general/button/button-confirm';

export default function Register() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      repeat: "",
      age: "",
      location: "",
    },
    onSubmit: values=>{
      console.log(values);
    }
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Title</title>
        <meta name="description" content="Register" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Register</h1>
        <form onSubmit={formik.handleSubmit} >
          <input placeholder={strings.username} className={input_styles['text-input']} type="text" id="username" name="username" pattern='' onChange={formik.handleChange} value={formik.values.username} />
          <input placeholder={strings.email} className={input_styles['text-input']} type="email" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
          <input placeholder={strings.password} className={input_styles['text-input']} type="password" id="password" name="password"  onChange={formik.handleChange} value={formik.values.password} />
          <input placeholder={strings.repeat} className={input_styles['text-input']} type="password" id="repeat" name="repeat"  onChange={formik.handleChange} value={formik.values.repeat} />
          <select placeholder={strings.age} id="age" name="age" onChange={formik.handleChange} value={formik.values.age}>
            <option>8-10</option>
            <option>11-13</option>
            <option>14-15</option>
            <option>16-17</option>
          </select>
          <input placeholder={strings.location} className={input_styles['text-input']} type="text" id="location" name="location" onChange={formik.handleChange} value={formik.values.location}/>
          <ButtonConfirm type="submit">{strings.register}</ButtonConfirm>
        </form>
      </main>
    </div>
  )
}
