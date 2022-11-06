import { TypedPostEndpoint } from "../../../src/lib/types/request";
import { Comment } from "../../../src/lib/types/fullPocketTypes";
import pocketbase from '../../../src/pocketbase';

export type AddCommentBodyParams = Comment;
export type AddCommentReturnParams = {id: string};

const handler: TypedPostEndpoint<AddCommentBodyParams, AddCommentReturnParams> = async (req, res) => {
  const pocketBaseInstance = pocketbase;
  try {
    const postInfo = await pocketBaseInstance.add(
      "post_infos",
      {
        author: req.body.author,
        body: req.body.body
      }
    );
    const commentRecord = await pocketBaseInstance.add(
      "comments",
      {
        post_info: postInfo.id,
        parent_post_info: req.body.parent_post_info
      }
    );
    res.status(200).json({id: commentRecord.id});
  } catch (error) {
    res.status(404).json(undefined);
  }

}

export default handler;
