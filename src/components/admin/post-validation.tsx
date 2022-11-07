import { useState } from "react";
import style from "../../../styles/admin.module.scss";
import ButtonConfirm from "../general/button/button-confirm";
import ButtonDanger from "../general/button/button-danger";
type PostValidationMenuProps = {
  post: {title: string, author: string, body: string}[];
}

export default function PostValidationMenu(prop: PostValidationMenuProps) {
  const posts = prop.post;
  const [selected, setSelected] = useState<number>();

  return (
  <div className={style.postReview}>
      {posts.map((post, index) => (
        <>
        <div className={style.row} onClick={() => setSelected(index)}>
          <p> Author: { post.author } </p>
          <p> Title: { post.title } </p>
        </div>
        {index == selected && (
          <div className={style.opened}>
            <p> { post.body } </p>
            <div className={style.removeRow}>
                <button className={`${style.button} ${style.green}`}> Approve </button>
                <button className={`${style.button}`}> Reject </button>
            </div>
          </div>
        )}
        </>
      ))}
  </div>
  )

}
