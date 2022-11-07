import { TypedGetEndpoint } from "../../../src/lib/types/request";
import { Comment, Profile } from "../../../src/lib/types/fullPocketTypes";
import pocketbase from '../../../src/pocketbase';
import Api from "../../../src/api";
import { PostInfosRecord, ReactionsRecord, RecordIdString } from "../../../src/lib/types/pocket";
import { BaseConverter } from "../../../src/lib/types/type-mapper";

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

    const {post_info, author, ...response} = { ...postInfo, ...postRecord };
    const responseAuthor = await Api.makeGetRequest("user/get-user-profile", {userId: postInfo.author}) as Profile;
    const responseReactions = await getReactions((postInfo as BaseConverter<PostInfosRecord>).id);

    res.status(200).json({
      "author": responseAuthor,
      "reactions": responseReactions,
      ...response
    });
  } catch (error) {
    res.status(404).send(undefined);
  }
}

async function getReactions(postInfoId: RecordIdString): Promise<Record<string, number>> {
  const pocketBaseInstance = pocketbase;
  const reactions = await pocketBaseInstance.getList("reactions");
  const reactionsCounts =
    await Promise.all(
      reactions.map(
        async (reaction) => {
          try {
            const reactionRecord = reaction as BaseConverter<ReactionsRecord>;
            const reactionList =
              await pocketBaseInstance.getList("reactions_to_posts",
                `(reaction = '${reactionRecord.id}' && post_info = '${postInfoId}')`);
            return reactionList.length;
          }
          catch (e) {
            return 0;
          }
        }
      )
    );
  const zipped: Record<string, number> = {};
  for (const i in reactions) {
    zipped[reactions[i].name] = reactionsCounts[i];
  }
  return zipped;
}

export default handler;
