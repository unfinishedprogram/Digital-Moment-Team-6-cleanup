import React from "react";
import Image from 'next/image'
import styles from '../../../styles/Index.module.scss'
import input_style from '../../../styles/input.module.scss'

export default class NavBar extends React.Component {
  render() {
    return <nav className={styles.nav}>
      <Image src="/img/logo.svg" width="50" height="50" alt="logo-placeholder" />
      <input className={input_style["text-input"]} type="search" placeholder="Search"></input>
      <Image src="/img/avatar.svg" width="50" height="50" alt="avatar-placeholder" />
    </nav>;
  }
}