import { TypedGetEndpoint } from "../../../src/lib/types/request";
import { getTagLocation } from "../../../src/lib/location_info";

export type GetTagLocQueryParams = { location: string };
export type GetTagLocReturnParams = { loc: [number, number] } | undefined;

const handler: TypedGetEndpoint<GetTagLocQueryParams, GetTagLocReturnParams> = async (req, res) => {
  let raw = getTagLocation(req.query.location as any);

  if (!raw) res.status(200).json({ loc: [0, 0] });
  res.status(200).json({ loc: [parseFloat(raw.latt), parseFloat(raw.longt)] });
}

export default handler;
