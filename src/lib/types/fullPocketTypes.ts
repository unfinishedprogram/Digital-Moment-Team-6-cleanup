import * as pocket from "./pocket";


export type Tag =
  pocket.TagsRecord;

// TODO remove "name" from age group from DB
export type AgeGroup =
  Omit<pocket.AgeGroupsRecord, "name">

export type Post =
  Omit<pocket.PostInfosRecord, "author">
  & Omit<pocket.PostsRecord, "post_info" | "tags">
  & {
    "tags": Tag[],
    "author": Profile
  };

export type Comment =
  Omit<pocket.PostInfosRecord, "author">
  & Omit<pocket.CommentsRecord, "post_info">
  & {
    "author": Profile
  };

export type CommentWithComments =
  Omit<Comment, "parent_post_info">
  & {
    "child_comments": CommentWithComments[]
  };

export type PostWithComments =
  Post & {
    "child_comments": CommentWithComments[]
  };

export type Profile =
  Omit<pocket.ProfilesRecord, "userId" | "age_group" | "preferences" | "location">
  & {
    "age_group": Omit<pocket.AgeGroupsRecord, "name">,
    "preferences": Tag[],
    "location": Tag
  };
