import React, { useEffect, useState } from 'react';
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
  const { posts, filter } = props;
  const [filtered, setFiltered] = useState<Post[]>([]);

  useEffect(() => {
    console.log("render")
    if (!filter) {
      setFiltered(s => posts)
    } else {
      let sortable: ISortablePost[] = posts.map(post => {
        let overlap = post.tags.filter(t => t.name in filter).length;
        return { post, overlap };
      });

      setFiltered(s => sortable.sort((a, b) => a.overlap - b.overlap).map(p => p.post));
    }
  }, [posts, filter])


  // This array needs to be populated with the API
  return <>{
    filtered.map((post, index) =>
      <PostComponent post={post as PostWithComments} key={index} />
    )}</>;
}

export default Explorer;