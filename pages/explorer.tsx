import React from 'react';
import PostComponent from '../src/components/general/post';
import { Post } from '../src/lib/types/fullPocketTypes';

export default function Explorer() {
  let posts: Array<Post> = []
  return (<>
    <div className={'post-of-the-day'}>
      <h1>Post of the day</h1>
    </div>
    <div className={'map'}>
      <h1>Map</h1>
    </div>
    {posts.map(post => {
      <PostComponent post={post} />
    })}
  </>);
}
