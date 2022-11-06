import { TypedPostEndpoint } from "../../../src/lib/types/request";
import { Post } from "../../../src/lib/types/fullPocketTypes";
import pocketbase from '../../../src/pocketbase';

export type AddPostBodyParams = Post;
export type AddPostReturnParams = {id: string};

const handler: TypedPostEndpoint<AddPostBodyParams, AddPostReturnParams> = async (req, res) => {
  const pocketBaseInstance = pocketbase;
  try {
    const postInfo = await pocketBaseInstance.add("post_infos", { author: req.body.author, body: req.body.body });
    const postRecord = await pocketBaseInstance.add("posts", {title: req.body.title, post_info: postInfo.id});
    res.status(200).json({id: postRecord.id});
  } catch (error) {
    res.status(404).json(undefined);
  }

}

export default handler;
