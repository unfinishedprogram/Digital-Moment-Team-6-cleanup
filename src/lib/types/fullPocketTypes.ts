import { PostsRecord, PostInfosRecord, ProfilesRecord, CommentsRecord, TagsRecord } from "./pocket";
import { User } from 'pocketbase';

export type Post = PostInfosRecord & Omit<PostsRecord, "post_info" | 'tags'> & {
    "tags": TagsRecord[];
}

export type Comment = PostInfosRecord & Omit<CommentsRecord, "post_info">;

export type UserProfile = Omit<ProfilesRecord, "userId"> & User;
