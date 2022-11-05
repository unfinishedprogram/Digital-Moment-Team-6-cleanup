import React from 'react';
import Post from '../src/components/general/post';
import { PostsRecord } from '../src/lib/types/pocket';

export default function Explorer() {
  let posts: Array<PostsRecord> = []
  return (<>
    <div className={'post-of-the-day'}>
      <h1>Post of the day</h1>
    </div>
    <div className={'map'}>
      <h1>Map</h1>
    </div>
    {posts.map(postObject => {
      <Post post={postObject} />
    })}
  </>);
}
