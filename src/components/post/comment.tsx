import React from "react";
import Image from "next/image";
import styles from'../../../styles/comment.module.scss'


interface IComment {
  text:string, 
  children:IComment[]
}


interface ICommentProps extends React.PropsWithChildren {
  text:string, 
  commentChildren:IComment[]
}

export const CommentComponent: React.FunctionComponent<ICommentProps> = props => {
  const children = props.children;
  return (
    <div className={styles.hor}>
      <div className={styles.vert}>
        <Image src="/img/avatar.svg" width="50" height="50" alt="avatar-placeholder" />
        <i className={styles.thread}></i>
      </div>
      <div>
        <h1 className={styles.title}>{props.text}</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus minus iste a accusantium tempore, dolorem perspiciatis delectus dolores quasi repellendus totam sunt ex? Amet explicabo, at nulla exercitationem reiciendis quaerat?</p>
        {props.commentChildren.map((child, index) => <CommentComponent key={index} text={child.text} commentChildren={child.children} />)}
      </div>
    </div>
  );

}