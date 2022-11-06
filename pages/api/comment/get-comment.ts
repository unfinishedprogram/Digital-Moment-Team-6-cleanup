import { TypedGetEndpoint } from "../../../src/lib/types/request";
import { Comment, Profile } from "../../../src/lib/types/fullPocketTypes";
import pocketbase from '../../../src/pocketbase';
import Api from "../../../src/api";

export type GetCommentQueryParams = {
  commentId: string;
}
export type GetCommentReturnParams = Comment | undefined;

const handler: TypedGetEndpoint<GetCommentQueryParams, GetCommentReturnParams> = async (req, res) => {
  const { commentId } = req.query;
  if (commentId == undefined) {
    res.status(400);
    return;
  }
  const pocketBaseInstance = pocketbase;

  try {
    const postRecord = await pocketBaseInstance.getOne("comments", commentId);
    const postInfo = await pocketBaseInstance.getOne("post_infos", postRecord.post_info);

    const {post_info, author, ...response} = {...postRecord, ...postInfo};
    const responseAuthor = await Api.makeGetRequest("user/get-user-profile", {userId: postInfo.author}) as Profile;

    res.status(200).json({
      "author": responseAuthor,
      ...response
    });
  } catch (error) {
    res.status(404).send(undefined);
  }
}

export default handler;
