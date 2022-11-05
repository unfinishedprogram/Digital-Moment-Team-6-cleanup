import React from "react";
import styles from '../../../styles/Index.module.scss'
import TagComponent from "./tag";
import { Post, Tag } from '../../lib/types/fullPocketTypes'

export default function PostComponent(props: { post: Post }) {
  if (!props.post) {
    return (
      <>
        <h1>{"There's no post to display!"}</h1>
      </>
    )
  } else {
    let post = props.post
    return (
      <>
        <h1>{post.title}</h1>
        <div className={styles['tags-container']}>
          {tags.map((tag: Tag) => {
            <TagComponent tag={tag} />
          })}
        </div>
      </>
    )
  }
}