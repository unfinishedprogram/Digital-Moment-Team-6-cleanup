import locationData from './location_data.json'
export type LocationTag = {
    longt: number,
    latt: number
}

export type CityLocation = keyof typeof locationData

export function getTagLocation(location: CityLocation): LocationTag {
  return locationData[location]
}
