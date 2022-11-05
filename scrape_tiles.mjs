import fs from "fs";

async function scrape(zoom_start, zoom_end) {
  let files = 0;
  let total = 0;
  let start = performance.now()

  for (let i = zoom_start; i < zoom_end; i++) {
    total += (2 ** i) ** 2;
  }

  for (let zoom = zoom_start; zoom < 3; zoom++) {
    for (let x = 0; x < 2 ** zoom; x++) {
      for (let y = 0; y < 2 ** zoom; y++) {
        await downloadTile(zoom, x, y);
        files += 1;
      }
      console.log(`downloaded: ${files} / ${total}`)
    }
  }

  for (let zoom = 3; zoom < zoom_end; zoom++) {
    for (let x = 0; x < 2 ** zoom; x++) {
      for (let y = 0; y < 2 ** zoom; y += 8) {
        await Promise.all([
          downloadTile(zoom, x, y),
          downloadTile(zoom, x, y + 1),
          downloadTile(zoom, x, y + 2),
          downloadTile(zoom, x, y + 3),
          downloadTile(zoom, x, y + 4),
          downloadTile(zoom, x, y + 5),
          downloadTile(zoom, x, y + 6),
          downloadTile(zoom, x, y + 7),
        ])
        files += 8;
        console.log(`downloaded: ${files} / ${total}`)
      }
    }
  }

  console.log(`took: ${(performance.now() - start) / 1000}s`)
}

async function getTile(z, x, y) {
  let res = await fetch(`https://demotiles.maplibre.org/tiles/${z}/${x}/${y}.pbf`);
  return new Uint8Array(await (await res.blob()).arrayBuffer());
}

async function downloadTile(z, x, y) {

  let dir = `./public/tiles/${z}/${x}`;

  fs.mkdirSync(dir, { recursive: true });

  return getTile(z, x, y)
    .then(blob => fs.writeFileSync(dir + `/${y}.pbf`, blob))
    .catch(e => console.error(e));
}

scrape(0, 7);