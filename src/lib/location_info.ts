type Location = {
  "location": {
    "longt": number
    "latt": number
  }
}

async function getLocationInfo(locations: string) {
  let apiKey: string = "170292596801184127888x39017"
  let baseURL: URL = new URL("https://geocode.xyz/");

  let locationInfo: Location[] = [];
  
  for (const location of locations) {
    let searchURL: URL = new URL(`${baseURL}${location}`);
    searchURL.searchParams.append('json', '1');
    searchURL.searchParams.append('auth', apiKey);

    let locationResponse: Response = await fetch (searchURL);
    let locationData = await locationResponse.json();
    let locationString: string = JSON.parse(JSON.stringify(`{"${locationData.standard.city}": { "latt": ${locationData.latt}, "longt": ${locationData.longt}}}`));
    locationInfo.push(JSON.parse(locationString));
  };
  return locationInfo
}

export { getLocationInfo };