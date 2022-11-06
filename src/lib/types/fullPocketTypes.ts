import { PostsRecord, PostInfosRecord, ProfilesRecord } from "./pocket";
import { User } from 'pocketbase';

export type Post = PostInfosRecord & Omit<PostsRecord, "post_info">;

export type UserProfile = Omit<ProfilesRecord, "userId"> & User;
