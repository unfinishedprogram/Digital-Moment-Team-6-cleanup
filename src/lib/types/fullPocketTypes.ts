import locationData from './location_data.json'
import pocketbaseInstance from '../../pocketbase'
export type LocationTag = {
  longt: number,
  latt: number
}

export type CityLocation = keyof typeof locationData

export function getTagLocation(location: CityLocation): LocationTag {
  return locationData[location]
}

export async function getLocationTagsFromDb(){
  return pocketbaseInstance.getList("tags", "type = location")
}