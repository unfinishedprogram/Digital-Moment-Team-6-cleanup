// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { writeLocations } from '../../src/lib/location_info'
import { getLocationTagsFromDb } from '../../src/lib/location_info'

type Data = {
  ok: boolean
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  getLocationTagsFromDb().then((tags)=>{
    writeLocations(tags.map((tag)=>{
      return tag.name
    }))
  })
  res.status(200).json({ ok: true })
}
