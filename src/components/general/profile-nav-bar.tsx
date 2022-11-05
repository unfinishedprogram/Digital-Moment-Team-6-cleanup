import React from "react";
import Image from 'next/image'
import styles from '../../../styles/Index.module.scss'
import { useRouter } from "next/router";

export default function ProfileNavBar() {
  let router = useRouter()

  return (
    <nav className={styles.nav}>
      <Image src="/img/chevrons-left.svg" onClick={router.back} width="50" height="50" alt="back-button-placeholder" />
      <div className={'navbar-spacer'}></div>
      <Image src="/img/avatar.svg" width="50" height="50" alt="avatar-placeholder" />
    </nav>
  )
}