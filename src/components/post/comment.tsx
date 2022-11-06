import React from "react";
import Image from "next/image";
import styles from'../../../styles/comment.module.scss'

export default class CommentComponent extends React.Component {
  render(): React.ReactNode {
    return (
      <div className={styles.hor}>
        <div className={styles.vert}>
          <Image src="/img/avatar.svg" width="50" height="50" alt="avatar-placeholder" />
          <i className={styles.thread}></i>
        </div>
        <div>
          <h1 className={styles.title}>Title</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus minus iste a accusantium tempore, dolorem perspiciatis delectus dolores quasi repellendus totam sunt ex? Amet explicabo, at nulla exercitationem reiciendis quaerat?</p>
        </div>
      </div>
    );

  }
}