import React from "react";
import styles from "../../../styles/post.module.scss"
import ButtonBase from "./button/button-base";
import { CommentWithComments } from "../../lib/types/fullPocketTypes";
import CommentComponent from "./comment";

export default function CommentSection(props: { comments: CommentWithComments[] | null }) {
  let comments: CommentWithComments[] | null = props.comments
  return (
    comments && comments.length > 0 ?
      <>
        <h2>Comment</h2>
        <div className={styles['comment-section']}>
          {comments.map((comment: CommentWithComments, index: number) => {
            return <CommentComponent comment={comment} key={index} />
          })}
        </div>
      </>
      :
      <>
        <div className={styles['comment-container']}>
          <p>No one has commented yet! Be the first to comment by click here:</p>
          <ButtonBase>Comment</ButtonBase></div>
      </>
  )
}