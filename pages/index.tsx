import React from 'react'
import Image from 'next/image'
import style from "../styles/Home.module.scss";

export default function Home() {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  return (<>
    <Image draggable={false} width={50} height={50} className={style.blobsBL} alt="blob" src="/img/blobsBL.svg" />
    <Image draggable={false} width={50} height={50} className={style.blobsTR} alt="blob" src="/img/blobsTR.svg" />
    <h1>Home</h1>
  </>)
}
