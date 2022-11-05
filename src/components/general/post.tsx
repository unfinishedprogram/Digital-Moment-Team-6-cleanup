import React from "react";
import styles from '../../../styles/Index.module.scss'
import Tag from "./tag";
import { PostsRecord } from "../../lib/types/pocket";

export default function Post({ title, tags }: PostsRecord) {
  if (!title) {
    return (
      <>
        <h1>{"There's no post to display!"}</h1>
      </>
    )
  } else {
    return (
      <>
        <h1>{title}</h1>
        <div className={styles['tags-container']}>
          {tags.map((tag: PostsRecord) => {
            <Tag tag={tag} />
          })}
        </div>
      </>
    )
  }
}