import { PostsRecord, PostInfosRecord } from "./pocket";

export type Post = PostInfosRecord & Omit<PostsRecord, "post_info">;
