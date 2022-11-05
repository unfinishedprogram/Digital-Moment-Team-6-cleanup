import React from "react";
import styles from "../../../styles/post.module.scss"
import { Tag } from "../../lib/types/fullPocketTypes";

export default function TagComponent(props: { tag: Tag }) {
  if (!props) {
    return (<></>)
  } else {
    let tag = props.tag
    return (
      <>
        <span className={styles.tag}>{tag.name}</span>
      </>
    )
  }
}