import React from "react";
import styles from "../../../styles/post.module.scss"
import { Comment } from "../../lib/types/fullPocketTypes";

export default function CommentComponent(props: { comment: Comment }) {
  let comment: Comment = props.comment

  const printifyDate = (date: Date): string => {
    return `${date.getMinutes()}:${date.getHours()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  }
  return (
    <div className={styles['comment-container']}>
      <div className={styles['comment-top-section']}>
        <h4>{comment.author.username}
          {/* {`at ${printifyDate(comment.time)}`} */}
        </h4>
      </div>
      <p>{comment.body}</p>
    </div>
  )
}