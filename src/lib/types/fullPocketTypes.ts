import { PostsRecord, PostInfosRecord, ProfilesRecord, CommentsRecord } from "./pocket";
import { User } from 'pocketbase';

export type Post = PostInfosRecord & Omit<PostsRecord, "post_info">;

export type Comment = PostInfosRecord & Omit<CommentsRecord, "post_info">;

export type UserProfile = Omit<ProfilesRecord, "userId"> & User;
