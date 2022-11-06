import Head from 'next/head'
import * as React from 'react';
import Api from '../src/api';
import styles from '../styles/Home.module.scss'
import input_styles from "../styles/input.module.scss"
import  dropdown_styles from "../styles/dropdownSelect.module.scss"
import {Formik, FormikHelpers, FormikProps, Form, Field, FieldProps} from 'formik';
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
let hasLangBeenSelected: boolean = false;
let hasPrefBeenSelected: boolean = false;
let hasAgeBeenSelected: boolean = false;
let isSubmitting: boolean = false;

const validate = (values: FormValues) => {
  const passwordRegex = RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$");
  const emailRegex = RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
  const errors :{
    password?: string;
    repeat?: string;
    email?: string;
    preferences?: string;
    languages?: string;
    age?: string;
  } = {
    password: undefined,
    repeat: undefined,
    email: undefined,
    preferences: undefined,
    languages: undefined,
    age: undefined,
  };
  
  if(values.password && !passwordRegex.test(values.password)){
    errors.password = strings.passwordError;
  }else{
    delete errors.password
  } 
  if(values.repeat  &&  values.password != values.repeat ){
    errors.repeat = strings.repeatError;
  }else{
    delete errors.repeat
  } 
  if(values.email && !emailRegex.test(values.email)){
    errors.email = strings.emailError;
  }else{
    delete errors.email
  } 
  if(hasLangBeenSelected && values.languages.length == 0 || values.languages.length == 0 && isSubmitting ){      
    errors.languages = strings.requiredError;
  }else{
    delete errors.languages
  } 
  if(hasPrefBeenSelected && values.preferences.length == 0 || values.preferences.length == 0 && isSubmitting ){
    errors.preferences = strings.requiredError;
  }else{
    delete errors.preferences
  } 
  if(hasAgeBeenSelected && !values.age || !values.age && isSubmitting){
    errors.age = strings.requiredError;
  }else{
    delete errors.age
  } 
  return errors
}

export default function Register(){
  const initialValues: FormValues = {
    username: "",
    email: "",
    password: "",
    repeat: "",
    age: "",
    location: "",
    preferences: [],
    languages: [],
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
          validate={validate}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false)
            // Api.makePostRequest("user/add-user-profile",{
            //   email: values.email,
            //   password: values.password,
            //   location: values.location,
            //   age: values.age,
            //   preferences: values.preferences,
            //   languages: values.languages,
            // })            
          }}
        >
          {({handleSubmit, handleChange, values, errors, validateForm}) =>(
            <Form onSubmit={(e) => {
              e.preventDefault()
              isSubmitting = true;
              validateForm()
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
                onChange={ e =>{
                  hasAgeBeenSelected = true;
                  values.age =  e!["value"];
                }} 
                className={dropdown_styles.dropdown}
                instanceId="age" 
                name="age" 
              />
              {errors.age ? <label htmlFor='age'>{errors.age}</label>: null}
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
                  hasLangBeenSelected = true;
                  let langs: string[] = []
                  e.forEach(el=> langs.push(el.value))
                  values.languages = langs
                  validateForm()
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
                  hasPrefBeenSelected = true;
                  let prefs: string[] = []
                  e.forEach(el=> prefs.push(el.value))
                  values.preferences = prefs
                  validateForm()
                }  
                }
              />
              {errors.preferences ? <label htmlFor='pref'>{errors.preferences}</label>: null}
              <ButtonConfirm type='submit'>{strings.register}</ButtonConfirm>
            </Form>
          )}
        </Formik>
        <h4>{strings.existingAccount} <Link href="/login">{strings.login}</Link></h4>
      </main>
    </div>
  )
}