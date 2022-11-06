import React, { useState } from "react";
import styles from '../../../styles/Index.module.scss'
import TagComponent from "./tag";
import { Post } from '../../lib/types/fullPocketTypes'
import { TagsRecord } from "../../lib/types/pocket";
import { HillshadeStyleLayer } from "maplibre-gl";

export default function InDepthPostComponent(props: { post: Post, hide: () => void, visibile: boolean }) {
  let post = props.post
  return (
    <>
      {
        post && props.visibile ?
          <>
            <div>
              <h1>{post.title}</h1>
              <h3>{post.author}</h3>
              <button type={"button"} onClick={() => { props.hide() }}>X</button>
            </div>
            <p>{post.body}</p>
            <div className={styles['tags-container']}>
              {post.tags.map((tag: TagsRecord, index: number) => {
                return <TagComponent tag={tag} key={index} />
              })}
            </div>
          </>
          :
          null
      }
    </>
  )
}