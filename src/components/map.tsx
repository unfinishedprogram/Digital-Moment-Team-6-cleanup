import styles from '../../styles/map.module.scss'
import React, { useEffect, useRef, useState } from 'react'

import maplibregl from "maplibre-gl"

interface IPost {
  tags: string[],
  location: [number, number]
}

let words = [
  "widen",
  "refuse",
  "lazy",
  "bomber",
]

let locations: [number, number][] = [];

for (let i = 0; i < 10; i++) {
  locations.push([Math.random() * 180 - 90, Math.random() * 180 - 90])
}

const randWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

const randLoc = () => {
  return locations[Math.floor(Math.random() * locations.length)] as [number, number];
}

const randomPost = (): IPost => {
  const tagsSet = new Set([randWord(), randWord(), randWord(), randWord(), randWord(), randWord()]);
  const tags: string[] = [];

  tagsSet.forEach(tag => {
    tags.push(tag);
  })

  return {
    tags,
    location: randLoc(),
  }
}

export interface ITagGroup {
  location: [number, number],
  tags: {
    [index: string]: number,
  }
}

interface ITagGroups {
  [index: string]: ITagGroup
}

function groupByLocation(posts: IPost[]): ITagGroups {
  let groups: ITagGroups = {};

  posts.forEach(post => {
    let key = post.location.toString();
    if (!groups[key]) {

      let tags: { [index: string]: number } = {};

      post.tags.forEach(tag => {
        tags[tag] = 1;
      })

      groups[key] = {
        location: post.location,
        tags,
      }
    } else {
      post.tags.forEach(tag => {
        if (groups[key].tags[tag]) {
          groups[key].tags[tag]++;
        } else {
          groups[key].tags[tag] = 1;
        }
      })
    }
  });

  return groups;
}

const tagElms = (tags: { [index: string]: number }) => {
  let arr = [];
  for (let tag in tags) {
    arr.push({ tag, count: tags[tag] });
  }
  arr.sort((a, b) => a.count - b.count);
  return arr;
}

interface IMapProps {
  enabled: boolean,
  height: number,
  tagClicked: (group: ITagGroup) => void
}

const Map: React.FunctionComponent<IMapProps> = props => {
  const [getMap, setMap] = useState<maplibregl.Map | null>(null);

  let arr = [];

  for (let i = 0; i < 50; i++) {
    arr.push(randomPost());
  }

  let groups = groupByLocation(arr);

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

      for (let locKey in groups) {
        var marker = new maplibregl.Marker({
          anchor: "bottom-left",
        }).setLngLat(groups[locKey].location)
          .addTo(map);

        marker.getElement().innerHTML = "";
        marker.getElement().append(...tagElms(groups[locKey].tags).map(tag => {
          let elm = document.createElement("div");
          elm.innerText = `${tag.tag} x${tag.count}`;
          return elm;
        }));
        marker.getElement().onclick = () => props.tagClicked(groups[locKey]);
      }
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