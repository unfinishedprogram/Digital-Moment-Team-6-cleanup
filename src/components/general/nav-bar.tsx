import React from "react";
import Image from 'next/image'
import styles from '../../../styles/Index.module.scss'
import input_style from '../../../styles/input.module.scss'
import Link from 'next/link'

export default class NavBar extends React.Component {
  render() {
    return <nav className={styles.nav}>
      <Link href="/map"><Image src="/img/logo.svg" width="50" height="50" alt="logo-placeholder" /></Link>
      <input type="search" placeholder="Search"></input>
      <Link href="/user"><Image src="/img/avatar.svg" width="50" height="50" alt="avatar-placeholder" /></Link>
    </nav>;
  }
}