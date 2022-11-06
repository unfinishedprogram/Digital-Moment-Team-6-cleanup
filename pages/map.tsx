import React, { useEffect, useState } from 'react'
import Drawer from '../src/components/drawer';

import Map, { ITagGroup } from '../src/components/map';

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
      {getTags.map((tag, index) => <div key={index}>{JSON.stringify(tag)}</div>)}
    </Drawer>
  </>;
}