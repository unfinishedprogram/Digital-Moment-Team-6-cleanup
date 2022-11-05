import styles from '../../styles/map.module.scss'
import React, { useEffect, useState } from 'react'

import maplibregl from "maplibre-gl"


export default function Map() {
  const [getMap, setMap] = useState<maplibregl.Map | null>(null);

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
    <div className={styles.map} id="map">
    </div>
  </>
  );
}