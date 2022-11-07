import { TypedGetEndpoint } from "../../../src/lib/types/request";
import { Post, Profile } from "../../../src/lib/types/fullPocketTypes";
import pocketbase from '../../../src/pocketbase';
import { BaseConverter, getTags } from "../../../src/lib/types/type-mapper";
import { PostsRecord, RecordIdString } from "../../../src/lib/types/pocket";
import Api from "../../../src/api";

export type GetAllPostsQueryParams = {}
export type GetAllPostsReturnParams = Post[] | undefined;

const handler: TypedGetEndpoint<GetAllPostsQueryParams, GetAllPostsReturnParams> = async (req, res) => {
  const pocketBaseInstance = pocketbase;

  try {
    const postsRecord = await pocketBaseInstance.getList("posts");
    const posts = (await Promise.all(postsRecord
      .map(
        post =>
          Api.makeGetRequest("post/get-post", { postId: (post as BaseConverter<PostsRecord>).id })
      ))
    ).map(
      post => post!
    );

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).send(undefined);
  }

}

export default handler;
