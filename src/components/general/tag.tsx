import React from "react";
import styles from "../../../styles/post.module.scss"
import { TagsRecord } from "../../lib/types/pocket";

export default function TagComponent(props: { tag: TagsRecord }) {
  let tag: TagsRecord = props.tag
  return (
    <>
      {
        tag && <div className={[styles.tag, styles[`tag-type-${tag.type}`]].join(" ")
        }>{tag.name}</div>
      }
    </>
  )
}