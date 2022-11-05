import React from "react";
import styles from "../../../styles/post.module.scss"
import { TagsRecord } from "../../lib/types/pocket";

export default function Tag({ name }: TagsRecord) {
  if (!name) {
    return (
      <>
        <span className={styles.tag}>{name}</span>
      </>
    )
  } else {
    return (<></>)
  }
}