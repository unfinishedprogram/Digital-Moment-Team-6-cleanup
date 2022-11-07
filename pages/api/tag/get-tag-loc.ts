import { TypedGetEndpoint } from "../../../src/lib/types/request";
import { getTagLocation } from "../../../src/lib/location_info";

export type GetTagLocQueryParams = { location: string };
export type GetTagLocReturnParams = { loc: [number, number] } | undefined;

const handler: TypedGetEndpoint<GetTagLocQueryParams, GetTagLocReturnParams> = async (req, res) => {
  let raw = getTagLocation(req.query.location as any);

  console.log(req.query.location);
  console.log(raw);

  if (!raw) return res.status(200).json({ loc: [90, 90] })

  res.status(200).json({ loc: [parseFloat(raw.latt), parseFloat(raw.longt)] });
}

export default handler;
