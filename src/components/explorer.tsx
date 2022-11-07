import React, { useState } from 'react';
import PostComponent from './general/post';
import { Post, PostWithComments } from '../lib/types/fullPocketTypes';


export interface IExplorerProps {
  posts: Post[],
}

const Explorer: React.FunctionComponent<IExplorerProps> = props => {
  // This array needs to be populated with the API
  return <>{props.posts.map((post, index) => <PostComponent post={post as PostWithComments} key={index} />)}</>
}

export default Explorer;