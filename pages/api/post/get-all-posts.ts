import { TypedGetEndpoint } from "../../../src/lib/types/request";
import { Post, Profile } from "../../../src/lib/types/fullPocketTypes";
import pocketbase from '../../../src/pocketbase';
import { BaseConverter, getTags } from "../../../src/lib/types/type-mapper";
import { PostsRecord, RecordIdString } from "../../../src/lib/types/pocket";
import Api from "../../../src/api_backend";

export type GetAllPostsQueryParams = {}
export type GetAllPostsReturnParams = Post[] | undefined;

const handler: TypedGetEndpoint<GetAllPostsQueryParams, GetAllPostsReturnParams> = async (req, res) => {
  const pocketBaseInstance = pocketbase;

  try {
    const postsRecord = await pocketBaseInstance.getList("posts");

    let posts: Post[] = [];

    for (let record of postsRecord) {
      posts.push(await Api.makeGetRequest("post/get-post", { postId: (record as BaseConverter<PostsRecord>).id }) as any);
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send(undefined);
  }

}

export default handler;
