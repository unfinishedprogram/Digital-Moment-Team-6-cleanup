import { TypedGetEndpoint } from "../../../src/lib/types/request";
import { Tag } from "../../../src/lib/types/fullPocketTypes";
import pocketbase from '../../../src/pocketbase';
import Api from "../../../src/api";
import { TagsRecord } from "../../../src/lib/types/pocket";
import { BaseConverter } from "../../../src/lib/types/type-mapper";

export type GetTagQueryParams = {}
export type GetTagReturnParams = Tag[] | undefined;

const handler: TypedGetEndpoint<GetTagQueryParams, GetTagReturnParams> = async (req, res) => {
  const pocketBaseInstance = pocketbase;

  try {
    const tagsRecord = await pocketBaseInstance.getList("tags");
    const tags = (await Promise.all(tagsRecord
      .map(
        tag =>
          Api.makeGetRequest("tag/get-tag", {tagId: (tag as BaseConverter<TagsRecord>).id})
      ))
    ).map(
      tag => tag!
    );

    res.status(200).json(tags);
  } catch (error) {
    res.status(404).send(undefined);
  }

}

export default handler;
