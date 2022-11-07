import { TypedGetEndpoint } from "../../../src/lib/types/request";
import { Tag } from "../../../src/lib/types/fullPocketTypes";
import pocketbase from '../../../src/pocketbase';

export type GetTagQueryParams = {
  tagId: string;
}
export type GetTagReturnParams = Tag | undefined;

const handler: TypedGetEndpoint<GetTagQueryParams, GetTagReturnParams> = async (req, res) => {
  const { tagId } = req.query;
  if (tagId == undefined) {
    res.status(400).send(undefined);
    return;
  }
  const pocketBaseInstance = pocketbase;

  try {
    const response = await pocketBaseInstance.getOne("tags", tagId);

    res.status(200).json(response);
  } catch (error) {
    res.status(404).send(undefined);
  }

}

export default handler;
