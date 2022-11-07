import React, { useEffect, useState } from 'react'
import Drawer from '../src/components/drawer';
import Explorer from '../src/components/explorer';

import Map, { ITagGroup } from '../src/components/map';


const posts = [];
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

export default function MapPage() {
  const [height, setHeight] = useState(100);
  const [getTags, setTags] = useState<ITagGroup[]>([]);

  const drawerChange = (newState: "open" | "closed" | "half") => {
    setHeight({
      "open": 0,
      "closed": 100,
      "half": 50
    }[newState])
  }

  useEffect(() => {
    setTags(getTags)
  }, [getTags]);


  const onTagClicked = (tag: ITagGroup) => {
    setTags((tags) => [tag, ...tags]);
  }

  return <>
    <Map height={100} enabled tagClicked={onTagClicked} />
    <Drawer stateChange={drawerChange} >
      <Explorer posts={posts}></Explorer>
    </Drawer>
  </>;
}