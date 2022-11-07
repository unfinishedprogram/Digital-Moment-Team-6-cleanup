
import React from "react";
import styles from "../../../styles/post.module.scss"
import { TagsRecord } from "../../lib/types/pocket";

const TagComponent: React.FunctionComponent<{ tag: TagsRecord }> = props =>
  <div className={[styles.tag, styles[`tag-type-${props.tag.type}`]].join(" ")}>{props.tag.name}</div>

export default TagComponent;