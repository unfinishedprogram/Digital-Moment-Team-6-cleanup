import React from "react";
import styles from "../../../styles/post.module.scss"
import { CommentWithComments } from "../../lib/types/fullPocketTypes";

export default function CommentComponent(props: { comment: CommentWithComments }) {
  let comment: CommentWithComments = props.comment

  const printifyDate = (date: Date): string => {
    return `${date.getMinutes()}:${date.getHours()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  }
  return (
    comment ?
      <>
        <div className={styles['comment-container']}>
          <div className={styles['comment-top-section']}>
            <h4>{comment.author.username}
              {/* {`at ${printifyDate(comment.time)}`} */}

            </h4>
          </div>
          <p>{comment.body}</p>
        </div>
        <>
          {
            comment.child_comments.map((comment: CommentWithComments, index: number) => {
              return <CommentComponent comment={comment} key={index} />
            })
          }
        </>
      </>
      :
      <>
        <div className={styles['comment-container']}>
          {"Something went wrong. There's not comment to display"}
        </div>
      </>
  )
}