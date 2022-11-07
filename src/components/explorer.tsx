import React, { useState } from 'react';
import PostComponent from './general/post';
import { Post, PostWithComments } from '../lib/types/fullPocketTypes';


export interface IExplorerProps {
  posts: Post[],
  filter: string[] | undefined;
}

interface ISortablePost {
  post: Post,
  overlap: number,
}

const Explorer: React.FunctionComponent<IExplorerProps> = props => {
  const filter = (posts: Post[], tags?: string[]) => {
    if (!tags) return posts;

    let sortable: ISortablePost[] = posts.map(post => {
      let overlap = post.tags.filter(t => t.name in tags).length;
      return { post, overlap };
    });
    return sortable.sort((a, b) => a.overlap - b.overlap).map(p => p.post);
  }

  // This array needs to be populated with the API
  return <>{
    filter(props.posts, props.filter).map((post, index) =>
      <PostComponent post={post as PostWithComments} key={index} />
    )}</>;
}

export default Explorer;