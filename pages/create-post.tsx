import Head from 'next/head'
import * as React from 'react';
import Api from '../src/api';
import styles from '../styles/Home.module.scss'
import {Formik, FormikHelpers, FormikProps, Form, Field, FieldProps} from 'formik';
import { strings } from '../src/localization/localization-create-post'
import ButtonConfirm from '../src/components/general/button/button-confirm';
import ButtonDanger from '../src/components/general/button/button-danger';
import TagSelector from "../src/components/general/tagSelector"
interface FormValues{
  title: string;
  postBody: string;
  tags: string[];
}

export default function CreatePost(){
  const initialValues: FormValues = {
    title: "",
    postBody: "",
    tags: [],
  }
  return(
    <div>
      <Head>
        <title>{strings.title}</title>
        <meta name="description" content="Register" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>{strings.title}</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) =>{

          }}
        >
          {({handleSubmit, handleChange, values, errors}) =>(
            <Form onSubmit={handleSubmit}>
              <input
                placeholder={strings.postTitle}
                type="text"
                name='title'
                id='title'
                onChange={handleChange}
                value={values.title}
                required
              />
              <TagSelector
                instanceId="tags"
                tags={["Stuff", "Your Mom", "your father"]}
                placeholder={strings.tags}
              />
              <textarea
                placeholder={strings.postBody}
                name='postBody'
                id='postBody'
                rows={10}
                cols={100}
                onChange={handleChange}
                value={values.postBody}
                required
              />
              <ButtonDanger type='reset'>Discard</ButtonDanger>
              <ButtonConfirm type='submit'> Post </ButtonConfirm>
            </Form>
          )}

        </Formik>
      </main>
    </div>
  )
}