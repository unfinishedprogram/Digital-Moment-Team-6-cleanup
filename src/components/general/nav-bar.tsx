import React from "react";
import Image from 'next/image'
import styles from '../../../styles/Index.module.scss'

export default class NavBar extends React.Component {
  render() {
    return <nav className={styles.nav}>
      <Image src="/img/logo.svg" width="50" height="50" alt="logo-placeholder" />
      <input type="search" placeholder="Search"></input>
      <Image src="/img/avatar.svg" width="50" height="50" alt="avatar-placeholder" />
    </nav>;
  }
}