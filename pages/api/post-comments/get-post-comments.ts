import Api from "../../../src/api";
import { CommentWithComments, Post, PostWithComments } from "../../../src/lib/types/fullPocketTypes";
import { CommentsRecord, PostInfosRecord, RecordIdString } from "../../../src/lib/types/pocket";
import { TypedGetEndpoint } from "../../../src/lib/types/request";
import { BaseConverter } from "../../../src/lib/types/type-mapper";
import pocketbase from "../../../src/pocketbase";

export type GetPostCommentsQueryParams = {
  postId: string;
}
export type GetPostCommentsReturnParams = PostWithComments | undefined;

const handler: TypedGetEndpoint<GetPostCommentsQueryParams, GetPostCommentsReturnParams> = async (req, res) => {
  const { postId } = req.query;
  if (postId == undefined) {
    res.status(400).send(undefined);
    return;
  }

  try {
    const post = (await Api.makeGetRequest("post/get-post", {postId}))!;
    const childComments = await getChildComments((post as BaseConverter<Post>).id);
    res.status(200).json({
      "child_comments": childComments,
      ...post
    });
  } catch (error) {
    res.status(404).send(undefined);
  }
}

async function getChildComments(postInfoId: RecordIdString): Promise<CommentWithComments[]> {
  const pocketBaseInstance = pocketbase;
  const comments =
    (await pocketBaseInstance.getList("comments"))
      .filter(
        comment =>
          comment.parent_post_info == postInfoId
      );
  const commentsWithComments: CommentWithComments[] = await Promise.all(
    comments.map(
      async (comment) => {
        const commentInfo = (await Api.makeGetRequest(
          "comment/get-comment",
          {commentId: (comment as BaseConverter<CommentsRecord>).id}
        ))!;
        const {parent_post_info, ...strippedCommentInfo} = {...commentInfo};
        const childComments = await getChildComments(comment.post_info);
        return ({
          "child_comments": childComments,
          ...strippedCommentInfo
        });
      }
    ));
  return commentsWithComments;
}

export default handler;
