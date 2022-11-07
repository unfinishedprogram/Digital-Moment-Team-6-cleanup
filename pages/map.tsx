import React, { useEffect, useState } from 'react'
import Api from '../src/api';
import Drawer from '../src/components/drawer';
import Explorer from '../src/components/explorer';

import Map, { ITagGroup } from '../src/components/map';
import { Post, PostWithComments } from '../src/lib/types/fullPocketTypes';
import { BaseConverter } from '../src/lib/types/type-mapper';

const fetchPostWithComments = async () => {
  let posts = await Api.makeGetRequest("post/get-all-posts", {});

  let withComments = await Promise.all(posts!.map(async post => {
    try {
      return await Api.makeGetRequest("post/get-post-comments", { postId: (post as BaseConverter<Post>).id })
    } catch {
      return post;
    }
  }));

  console.log(withComments);
  return withComments as PostWithComments[];
}

export default function MapPage() {
  const [height, setHeight] = useState(100);
  const [getTags, setTags] = useState<ITagGroup[]>([]);
  const [posts, setPosts] = useState<PostWithComments[]>([]);

  if (posts.length < 1) {
    fetchPostWithComments().then(posts => {
      setPosts(state => posts);
    })
  }

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