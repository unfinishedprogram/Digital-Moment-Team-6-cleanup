import React from "react";
import Image from 'next/image'
import styles from '../../../styles/Index.module.scss'

export default class CustomFooter extends React.Component {
  render() {
    return <footer className={styles.footer}>
      <span>Source:</span>
      <a
        href='https://github.com/CodeToGive6/Digital-Moment-Team-6'
        target={'_blank'}
        rel="noreferrer">
        Github
      </a>
    </footer>
  }
}