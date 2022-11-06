import React, { useEffect, useState } from 'react';
import PostComponent from '../src/components/general/post';
import { Post } from '../src/lib/types/fullPocketTypes';

export default function Explorer() {
  // This array needs to be populated with the API
  const [posts, setPosts] = useState<Post[]>((): Post[] => {
    let posts: Post[] = []
    for (let i = 0; i < 10; i++) {
      posts.push({
        author: "Bob",
        body: "This is my problem",
        title: "Mega problem",
        tags: [{
          name: "mega",
          type: "topic"
        }, {
          name: "mega",
          type: "topic"
        }, {
          name: "mega",
          type: "topic"
        }, {
          name: "mega",
          type: "topic"
        }, {
          name: "mega",
          type: "topic"
        }, {
          name: "mega",
          type: "topic"
        }]
      })
    }
    return posts
  })

  return (
    <>
      {
        posts.length > 0 ?
          <>
            {
              posts.map((post, index) => {
                return <PostComponent post={post} key={index} />
              })
            }
          </>
          :
          <h1>{"There's no posts to display!"}</h1>
      }
    </>
  );
}
