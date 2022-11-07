import { TypedPostEndpoint } from "../../../src/lib/types/request";
import { Post } from "../../../src/lib/types/fullPocketTypes";
import pocketbase from '../../../src/pocketbase';
import { getTagIds } from "../../../src/lib/types/type-mapper";
import { RecordIdString } from "../../../src/lib/types/pocket";

export type AddPostBodyParams =
  Omit<Post, "author" | "reactions">
  & {
    "author": RecordIdString
  };
export type AddPostReturnParams = {id: string};

const handler: TypedPostEndpoint<AddPostBodyParams, AddPostReturnParams> = async (req, res) => {
  const pocketBaseInstance = pocketbase;
  try {
    const postInfo = await pocketBaseInstance.add(
      "post_infos",
      {
        author: req.body.author,
        body: req.body.body
      }
    );
    const postRecord = await pocketBaseInstance.add(
      "posts",
      {
        post_info: postInfo.id,
        title: req.body.title,
        tags: getTagIds(req.body.tags) as unknown as string
      }
    );
    res.status(200).json({id: postRecord.id});
  } catch (error) {
    res.status(400).json(undefined);
  }
}

export default handler;
