import { PostsRecord, PostInfosRecord, TagsRecord } from "./pocket";

export type Post = PostInfosRecord & Omit<PostsRecord, "post_info">;
export type Tag = TagsRecord;
