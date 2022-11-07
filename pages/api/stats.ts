import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  post_in_past_hour: number,
  reactions_in_past_hour: number,
  comments_in_past_hour: number
  top_trending_tags: TagData
}

type TagData = {
  [key: string]: number
}


// this whole endpoint is mocked but based on data that could actually be retrieved
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    post_in_past_hour: 1008765,
    reactions_in_past_hour: 12308765,
    comments_in_past_hour: 8765,
    top_trending_tags: {"racism": 100, "iran": 88, "poverty": 45, "hunger": 34, "ukraine": 20, "war": 15, "education": 1000}
  })
}