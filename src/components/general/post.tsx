import React from "react";
import styles from '../../../styles/Index.module.scss'
import TagComponent from "./tag";
import { Post } from '../../lib/types/fullPocketTypes'
import { TagsRecord } from "../../lib/types/pocket";

export default function PostComponent(props: { post: Post }) {
  let post = props.post
  return (
    <>
      {
        post ?
          <>
            <h1>{post.title}</h1>
            <div className={styles['tags-container']}>
              {post.tags.map((tag: TagsRecord, index: number) => {
                return <TagComponent tag={tag} key={index} />
              })}
            </div>
          </>
          :
          <>
            <h1>{"There's no post to display!"}</h1>
          </>
      }
    </>
  )
}