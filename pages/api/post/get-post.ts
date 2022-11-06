import { TypedGetEndpoint } from "../../../src/lib/types/request";
import { Post } from "../../../src/lib/types/fullPocketTypes";
import pocketbase from '../../../src/pocketbase';
import { getTags } from "../helper";
import { RecordIdString } from "../../../src/lib/types/pocket";

export type GetPostQueryParams = {
  postId: string;
}
export type GetPostReturnParams = Post | undefined;

const handler: TypedGetEndpoint<GetPostQueryParams, GetPostReturnParams> = async (req, res) => {
  const { postId } = req.query;
  if (postId == undefined) {
    res.status(400);
    return;
  }
  const pocketBaseInstance = pocketbase;

  try {
    const postRecord = await pocketBaseInstance.getOne("posts", postId);
    const postInfo = await pocketBaseInstance.getOne("post_infos", postRecord.post_info);

    const {post_info, tags, ...response} = {...postRecord, ...postInfo};
    const responseTags = await getTags(tags as unknown as RecordIdString[]);

    res.status(200).json({
      "tags": responseTags,
      ...response
    });
  } catch (error) {
    res.status(404).send(undefined);
  }

}

export default handler;
