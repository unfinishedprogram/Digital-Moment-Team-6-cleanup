import { PostsRecord, PostInfosRecord, ProfilesRecord, CommentsRecord, TagsRecord, UserIdString } from "./pocket";
import { User } from 'pocketbase';

export type Reaction = {
    type: "happy" | "sad" | "shocked" | "angry"
    author: UserIdString,
}

export type Comment = {
    author: UserIdString;
    body: string;
    time: Date;
    reactions: Reaction[] | null
}

export type Post = PostInfosRecord & Omit<PostsRecord, "post_info" | 'tags'> & {
    "tags": TagsRecord[];
    "comments": Comment[] | null;
}

// This was commented out by Marian at 6:50PM 2022-11-06
// export type Comment = PostInfosRecord & Omit<CommentsRecord, "post_info">;

export type UserProfile = Omit<ProfilesRecord, "userId"> & User;
