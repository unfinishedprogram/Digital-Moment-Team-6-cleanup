import React from "react";
import styles from "../../../styles/post.module.scss"
import { TagsRecord } from "../../lib/types/pocket";

export default function TagComponent(props: { tag: TagsRecord }) {
  return (
    <>
      {
        props.tag && <span className={styles.tag}>{props.tag.name}</span>
      }
    </>
  )
}