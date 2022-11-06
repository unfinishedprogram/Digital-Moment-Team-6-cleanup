
import { TypedGetEndpoint } from "../../../src/lib/types/request";
import { Comment } from "../../../src/lib/types/fullPocketTypes";
import pocketbase from '../../../src/pocketbase';

export type GetCommentQueryParams = {
  postId: string;
}

export type GetCommentReturnParams = Comment | undefined;

const handler: TypedGetEndpoint<GetCommentQueryParams, Comment | undefined> = async (req, res) => {
  const { postId: commentId } = req.query;
  if (commentId == undefined) {
    res.status(400);
    return;
  }
  const pocketBaseInstance = pocketbase;

  try {
    const postRecord = await pocketBaseInstance.getOne("comments", commentId);
    const postInfo = await pocketBaseInstance.getOne("post_infos", postRecord.post_info);

    const {post_info, ...response} = {...postRecord, ...postInfo};

    res.status(200).json(response);
  } catch (error) {
    res.status(404).send(undefined);
  }

}

export default handler;
