import input_styles from '../styles/input.module.scss'
import select_styles from '../styles/dropdownSelect.module.scss'
import ButtonBase from '../src/components/general/button/button-base';
import ButtonConfirm from '../src/components/general/button/button-confirm';
import ButtonDanger from '../src/components/general/button/button-danger';

import React from 'react'
import Select from 'react-select'



export default function Home() {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  return (<>
    <h1>Home</h1>
    <input type="username" placeholder='username' className={input_styles["text-input"]}></input>
    <input type="email" placeholder='email' className={input_styles["text-input"]}></input>
    <input type="checkbox" className={input_styles["checkbox-input"]}></input>
    <Select className={select_styles.dropdown} options={options}></Select>
    <div>
      <ButtonBase>Click Me</ButtonBase>
      <ButtonConfirm>Confirm</ButtonConfirm>
      <ButtonDanger>Cancel</ButtonDanger>
    </div>
  </>)
}