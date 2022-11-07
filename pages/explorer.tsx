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
        body: "This is my problem.".repeat(100),
        title: "Mega problem",
        tags: [
          {
            name: "mega",
            type: "language"
          }, {
            name: "mega",
            type: "topic"
          }, {
            name: "mega",
            type: "location"
          }, {
            name: "mega",
            type: "topic"
          }, {
            name: "mega",
            type: "topic"
          }, {
            name: "mega",
            type: "topic"
          }
        ],
        comments: [
          {
            author: "Joe",
            body: "This is a great post.",
            time: new Date(),
            reactions: [
              {
                author: "Bob",
                type: "happy"
              }
            ]
          }
          ,
          {
            author: "Guilherme",
            "body": "I don't like this comment.",
            time: new Date(),
            reactions: null
          }
        ]
        // comments: null //sumilating no comments
      })
    }
    return posts
  })

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
