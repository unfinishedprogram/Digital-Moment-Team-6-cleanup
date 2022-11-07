import React from 'react'
import Image from 'next/image'
import style from "../styles/Home.module.scss";
import Link from 'next/link';

export default function Home() {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  return (<>
    <div className={style.blob_container}>
      <Image draggable={false} width={50} height={50} className={style.blobsBL} alt="blob" src="/img/circle.svg" />
      <Image draggable={false} width={50} height={50} className={style.blobsTR} alt="blob" src="/img/circle.svg" />
    </div>


    <div className={style.container}>
      <h1 className={style.logo}>WAVE</h1>
      <div className={style.buttons_container}>
        <div className={style.explore}>
          <Link href="/map">Explore</Link>
        </div>
        <Link href="/register" className={style.register}>
          Register
        </Link>
        <Link href="/login" className={style.login}>
          Login
        </Link>
      </div>
    </div>
  </>)
}
