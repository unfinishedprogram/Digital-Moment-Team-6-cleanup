import React, { useEffect, useState } from 'react';
import Api from '../src/api';
import ButtonBase from '../src/components/general/button/button-base';
import PostComponent from '../src/components/general/post';
import { PostWithComments } from '../src/lib/types/fullPocketTypes';

export default function Explorer() {
  // This array needs to be populated with the API
  const [posts, setPosts] = useState<PostWithComments[]>([]);
  (async () => {
    let posts: PostWithComments[] = []
    let data = await Api.makeGetRequest("post-comments/get-post-comments", { postId: "6qpoc6knshk5k8h" })
    console.log(data);
    
    setPosts([data!])
  })()

  return (
    <>
      {
        posts.length > 0 ?
          <>
            <div>
              {
                posts.map((post, index) => {
                  return <PostComponent post={post} key={index} />
                })
              }
            </div>
          </>
          :
          <h1>{"There's no posts to display!"}</h1>
      }
    </>
  );
}
