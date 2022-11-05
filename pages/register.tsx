import Head from 'next/head'
import React from 'react';
import Api from '../src/api';
import styles from '../styles/Home.module.scss'
import input_styles from "../styles/input.module.scss"
import  dropdown_styles from "../styles/dropdownSelect.module.scss"
import {useFormik} from 'formik';
import { strings } from '../src/localization/localization-register'
import ButtonConfirm from '../src/components/general/button/button-confirm';
import Link from 'next/link';
import TagSelector from "../src/components/general/tagSelector"
import Select from "react-select"
let lang =['English', 'French', 'Spanish']
let preferences = ["politics", "racism", "war"]
const ageOptions = [
  { value: '8-10', label: '8-10'  },
  { value: '11-13', label: '11-13' },
  { value: '14-15', label: '14-15' },
  { value: '16-17', label: '16-17' },
]

export default function Register() {
  const validate = (values: {
    password: any;
    repeat: any;
    email: any;
    }) =>{  
    const passwordRegex = RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$");
    const emailRegex = RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    const errors : typeof values  = {
      password: undefined,
      repeat: undefined,
      email: undefined,
    };
    console.log(passwordRegex.test(values.password));
    if(values.password && !passwordRegex.test(values.password)){
      errors.password = strings.passwordError;
    }    
    if(values.repeat  &&  values.password != values.repeat ){
      errors.repeat = strings.repeatError;
    }
    if(!emailRegex.test(values.email)){
      errors.email = strings.emailError;
    }
    return errors
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      repeat: "",
      age: "",
      location: "",
      preferences: [],
      languages: [],
    },
    validate,
    onSubmit: values=>{
      Api.makePostRequest("user/create",{
        email: formik.values.email,
        password: formik.values.password,
        location: formik.values.location,
        age: formik.values.age,
        preferences: formik.values.preferences,
        languages: formik.values.languages,
      })
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
          <input 
            placeholder={strings.username} 
            className={input_styles['text-input']} 
            type="text" 
            id="username"
            name="username" 
            onChange={formik.handleChange} 
            value={formik.values.username} 
            required 
          />
          {formik.errors.username ? <label htmlFor='username'>{formik.errors.username}</label>: null}
          <input 
            placeholder={strings.email}
            className={input_styles['text-input']} 
            type="text"
            id="email"
            name="email" 
            onChange={formik.handleChange} 
            value={formik.values.email} 
            required 
          />
          {formik.errors.email ? <label htmlFor='email'>{formik.errors.email}</label>: null}
          <input 
            placeholder={strings.password}
            className={input_styles['text-input']} 
            type="password"
            id="password"
            name="password" 
            onChange={formik.handleChange} 
            value={formik.values.password} 
            required 
          />
          {formik.errors.password ? <label htmlFor='password'>{formik.errors.password}</label>: null}
          <input 
            placeholder={strings.repeat}
            className={input_styles['text-input']} 
            type="password"
            id="repeat"
            name="repeat" 
            onChange={formik.handleChange} 
            value={formik.values.repeat} 
            required 
          />
          {formik.errors.repeat ? <label htmlFor='repeat'>{formik.errors.repeat}</label>: null}
          <Select 
            options={ageOptions}
            placeholder={strings.age} 
            onChange={formik.handleChange} 
            className={dropdown_styles['dropdown']}
            id="age" 
            name="age" 
          />
          <input 
            placeholder={strings.location} 
            className={input_styles['text-input']} 
            type="text" 
            id="location" 
            name="location" 
            onChange={formik.handleChange} 
            value={formik.values.location}
            required
          />
          {formik.errors.location ? <label htmlFor='location'>{formik.errors.location}</label>: null}
          <TagSelector tags={lang} placeholder={strings.languages}></TagSelector>
          <TagSelector tags={preferences} placeholder={strings.preferences}></TagSelector>
          <ButtonConfirm>{strings.register}</ButtonConfirm>
        </form>
        <h4>Already have an account? <Link href="/login">Login</Link></h4>
      </main>
    </div>
  )
}
