import input_styles from '../styles/input.module.scss'
import select_styles from '../styles/dropdownSelect.module.scss'
import ButtonBase from '../src/components/general/button/button-base';
import ButtonConfirm from '../src/components/general/button/button-confirm';
import ButtonDanger from '../src/components/general/button/button-danger';

import React from 'react'
import Select from 'react-select'
import TagSelect from '../src/components/general/tagSelector';



export default function Home() {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  return (<>
    <h1>Home</h1>
  </>)
}
