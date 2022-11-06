import Head from 'next/head'
import * as React from 'react';
import Api from '../src/api';
import styles from '../styles/Home.module.scss'
import input_styles from "../styles/input.module.scss"
import  dropdown_styles from "../styles/dropdownSelect.module.scss"
import {useFormik, Formik, FormikHelpers, FormikProps, Form, Field, FieldProps} from 'formik';
import { strings } from '../src/localization/localization-register'
import ButtonConfirm from '../src/components/general/button/button-confirm';
import Link from 'next/link';
import TagSelector from "../src/components/general/tagSelector"
import Select from "react-select"
let lang =['English', 'French', 'Spanish']
let pref = ["politics", "racism", "war"]
const ageOptions = [
  { value: '8-10', label: '8-10'  },
  { value: '11-13', label: '11-13' },
  { value: '14-15', label: '14-15' },
  { value: '16-17', label: '16-17' },
]

interface FormValues{
  username: string;
  password: string;
  repeat: string;
  email: string;
  age: string;
  location: string;
  preferences: string[];
  languages: string[];
}
export default function MyApp(){
  const initialValues: FormValues = {
    username: "",
    email: "",
    password: "",
    repeat: "",
    age: "",
    location: "",
    preferences: [""],
    languages: [""],
  }

  return(
    <div className={styles.container}>
      <Head>
        <title>Title</title>
        <meta name="description" content="Register" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Register</h1>
        <Formik
          initialValues={initialValues}
          // validate = {values =>{
          //   const passwordRegex = RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$");
          //   const emailRegex = RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
          //   const errors :{
          //     password: any;
          //     repeat: any;
          //     email: any;
          //     preferences: any;
          //     languages: any;
          //   } = {
          //     password: undefined,
          //     repeat: undefined,
          //     email: undefined,
          //     preferences: undefined,
          //     languages: undefined,
          //   };
          //   if(values.password && !passwordRegex.test(values.password)){
          //     errors.password = strings.passwordError;
          //   }    
          //   if(values.repeat  &&  values.password != values.repeat ){
          //     errors.repeat = strings.repeatError;
          //   }
          //   if(!emailRegex.test(values.email)){
          //     errors.email = strings.emailError;
          //   }
          //   if(values.preferences.length == 0){
          //     errors.preferences = strings.requiredError;
          //   }
          //   if(values.languages.length == 0){      
          //     errors.languages = strings.requiredError;
          //   }
          // }}
          onSubmit={(values, actions) => {
            console.log({values, actions})
            actions.setSubmitting(false)
          }}
        >
          {({handleSubmit, handleChange, values, errors}) =>(
            <Form onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(e)}}
            >
              <input 
                placeholder={strings.username} 
                className={input_styles['text-input']} 
                type="text" 
                id="username"
                name="username" 
                onChange={handleChange} 
                value={values.username} 
                required 
              />
              {errors.username ? <label htmlFor='username'>{errors.username}</label>: null}
              <input 
                placeholder={strings.email}
                className={input_styles['text-input']} 
                type="text"
                id="email"
                name="email" 
                onChange={handleChange} 
                value={values.email} 
                required 
              />
              {errors.email ? <label htmlFor='email'>{errors.email}</label>: null}
              <input 
                placeholder={strings.password}
                className={input_styles['text-input']} 
                type="password"
                id="password"
                name="password" 
                onChange={handleChange} 
                value={values.password} 
                required 
              />
              {errors.password ? <label htmlFor='password'>{errors.password}</label>: null}
              <input 
                placeholder={strings.repeat}
                className={input_styles['text-input']} 
                type="password"
                id="repeat"
                name="repeat" 
                onChange={handleChange} 
                value={values.repeat} 
                required 
              />
              {errors.repeat ? <label htmlFor='repeat'>{errors.repeat}</label>: null}
              <Select 
                options={ageOptions}
                placeholder={strings.age} 
                onChange={ e =>{values.age =  e!["value"]}} 
                className={dropdown_styles.dropdown}
                instanceId="age" 
                name="age" 
              />
              <input 
                placeholder={strings.location} 
                className={input_styles['text-input']} 
                type="text" 
                id="location" 
                name="location" 
                onChange={handleChange} 
                value={values.location}
                required
              />
              {errors.location ? <label htmlFor='location'>{errors.location}</label>: null}
              <TagSelector 
                tags={lang} 
                placeholder={strings.languages}
                instanceId="languages" 
                onChange={e => {
                  let langs: string[] = []
                  e.forEach(el=> langs.push(el.value))
                  values.languages = langs
                }
                }
              />
              {errors.languages ? <label htmlFor='languages'>{errors.languages}</label>: null}
              <TagSelector 
                tags={pref}
                placeholder={strings.preferences}
                instanceId="pref" 
                name='pref'
                onChange={e => {
                  let prefs: string[] = []
                  e.forEach(el=> prefs.push(el.value))
                  values.preferences = prefs
                }  
                }
              />
              {errors.preferences ? <label htmlFor='pref'>{errors.preferences}</label>: null}
              <ButtonConfirm type='submit'>{strings.register}</ButtonConfirm>
            </Form>
          )}
        </Formik>
        <h4>Already have an account? <Link href="/login">Login</Link></h4>
      </main>
    </div>
  )
}