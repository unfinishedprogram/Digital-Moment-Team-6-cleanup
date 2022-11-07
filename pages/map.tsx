import React, { useEffect, useState } from 'react'
import Api from '../src/api';
import Drawer from '../src/components/drawer';
import Explorer from '../src/components/explorer';

import Map, { ITagGroup } from '../src/components/map';
import SettingsButton, { FilterChange } from '../src/components/overlay/settingsButton';
import { Post, PostWithComments } from '../src/lib/types/fullPocketTypes';
import { BaseConverter } from '../src/lib/types/type-mapper';

const fetchPostWithComments = async () => {
  let posts = await Api.makeGetRequest("post/get-all-posts", {});
  let withComments = posts!.map(async post => await Api.makeGetRequest("post/get-post-comments", { postId: (post as BaseConverter<Post>).id }));
  return await Promise.all(withComments);
}

export default function MapPage() {
  const [height, setHeight] = useState(100);
  const [posts, setPosts] = useState<PostWithComments[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [filter, setFilter] = useState<FilterChange>();

  if (posts.length < 1) {
    fetchPostWithComments().then(posts => {
      setPosts(state => posts as PostWithComments[]);
    })
  }

  const drawerChange = (newState: "open" | "closed" | "half") => {
    setHeight({
      "open": 0,
      "closed": 100,
      "half": 50
    }[newState])
  }

  setTags(
    posts.flatMap(post => post.tags.map(tag => tag.name))
  );

  return <>
    <Map height={100} posts={posts} enabled tagClicked={() => {}} />
    <SettingsButton tags={tags} onFilterChange={(filter) => setFilter(filter)}/>
    <Drawer stateChange={drawerChange} >
      <Explorer posts={posts}></Explorer>
    </Drawer>
  </>;
}
