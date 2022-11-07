import styles from '../../styles/map.module.scss'
import React, { useEffect, useRef, useState } from 'react'

import maplibregl from "maplibre-gl"

import { PostWithComments } from '../../src/lib/types/fullPocketTypes';
import Api from '../api';

interface IPost {
  tags: string[],
  location: [number, number]
}

export interface ITagGroup {
  location: [number, number],
  tags: string[],
}

interface ITagGroups {
  [index: string]: ITagGroup
}

const groupTags = async (posts: PostWithComments[]): Promise<ITagGroups> => {
  let tagGroups: ITagGroups = {};

  for (let post of posts) {
    for (let tag of post.tags) {
      console.log(tag);
      if (tag.type == "location") {
        const v2loc: [number, number] = (await Api.makeGetRequest("tag/get-tag-loc", { location: tag.name }))?.loc.map(i => parseFloat(i as unknown as string)) as [number, number];
        v2loc[0] -= 180;
        v2loc[1] -= 180;
        if (tagGroups[tag.name]) {
          tagGroups[tag.name].tags.push(...post.tags.filter(t => t.type != location as any).map(t => t.name));
        } else {
          console.log("New Location")

          tagGroups[tag.name] = { location: v2loc, tags: [...post.tags.filter(t => t.type != location as any).map(t => t.name)] };
        }
      }
    }
  }

  return tagGroups;
}

const mapTag = (tagGroup: ITagGroup): HTMLDivElement => {
  const elm = document.createElement("div");

  if (!tagGroup) {
    elm.innerText = "This is a problem";
    return elm;
  }

  for (let tag in tagGroup.tags) {
    const tagElm = document.createElement("span");
    tagElm.textContent = tag;
    tagElm.classList.add("map-tag", tag);
    elm.append(tagElm);
  }

  return elm;
}

interface IMapProps {
  posts: PostWithComments[],
  enabled: boolean,
  height: number,
  tagClicked: (group: ITagGroup) => void
}

const Map: React.FunctionComponent<IMapProps> = props => {
  const [getMap, setMap] = useState<maplibregl.Map | null>(null);
  const [getTagGroups, setTagGroups] = useState<ITagGroups | null>(null);

  useEffect(() => {
    groupTags(props.posts).then(groups => {
      // setTagGroups(s => groups);

      console.log(Object.keys({ ...groups }))
      console.log(Object.values({ ...groups }))
      console.log({ ...groups })

      for (let locKey in { ...groups }) {
        var marker = new maplibregl.Marker({
          anchor: "bottom-left",
          element: mapTag(groups[locKey]),
        }).setLngLat(groups[locKey].location)
          .addTo(getMap!);

        marker.getElement().onclick = () => props.tagClicked(groups[locKey]);
      }


    })
  }, [props.posts])


  let mapElmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mapElmRef.current?.setAttribute("style", `--size: ${props.height}vh`);
  })

  useEffect(() => {
    if (!getMap) {
      // Make sure this is only called once
      const map = new maplibregl.Map({
        container: 'map',
        style: '/mapstyle.json',
        center: [0, 0],
        zoom: 0
      });

      map.dragRotate.disable();
      map.touchPitch.disable();
      setMap(map);
    }
  }, [])

  return (<>
    <link rel="stylesheet" href="style/maplibregl.css" />
    <div ref={mapElmRef} className={styles.map} id="map">
    </div>
  </>
  );
}

export default Map;