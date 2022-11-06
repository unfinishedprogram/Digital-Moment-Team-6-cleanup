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
    <div className={style.container}>
      <h1 className={style.logo}>WAVE</h1>
      <div className={style.buttons_container}>
        <div className={style.explore}>
          <div>
            <span>Explore</span>
          </div>
        </div>
        <div className={`${style.button} ${style.register}`}><span>Register</span></div>
        <div className={`${style.button} ${style.login}`}><span>Login</span></div>
      </div>
    </div>
  </>)
}
