// This file was @generated using pocketbase-typegen

export type IsoDateString = string

export type RecordIdString = string

export type UserIdString = string

export type BaseRecord = {
    id: RecordIdString
    created: IsoDateString
    updated: IsoDateString
    "@collectionId": string
    "@collectionName": string
}

export enum Collections {
	AgeGroups = "age_groups",
	Comments = "comments",
	Messages = "messages",
	PostInfos = "post_infos",
	Posts = "posts",
	Profiles = "profiles",
	Reactions = "reactions",
	ReactionsToPosts = "reactions_to_posts",
	Tags = "tags",
}

export type AgeGroupsRecord = {
	min: number
	max: number
	name: string
}

export type CommentsRecord = {
	post_info: RecordIdString
	parent_post_info: RecordIdString
}

export type MessagesRecord = {
	sender: UserIdString
	receiver: UserIdString
	body: string
	seen?: boolean
}

export type PostInfosRecord = {
	author: UserIdString
	body: string
}

export type PostsRecord = {
	post_info: RecordIdString
	title: string
	tags: RecordIdString
}

export type ProfilesRecord = {
	userId: UserIdString
	username: string
	avatar?: string
	age_group: RecordIdString
	preferences: RecordIdString
	location: RecordIdString
}

export type ReactionsRecord = {
	name: string
}

export type ReactionsToPostsRecord = {
	reaction: RecordIdString
	post_info: RecordIdString
	author: UserIdString
}

export type TagsRecord = {
	name: string
	parent_tag?: RecordIdString
	type: "location" | "topic" | "language"
}

export type CollectionRecords = {
	age_groups: AgeGroupsRecord
	comments: CommentsRecord
	messages: MessagesRecord
	post_infos: PostInfosRecord
	posts: PostsRecord
	profiles: ProfilesRecord
	reactions: ReactionsRecord
	reactions_to_posts: ReactionsToPostsRecord
	tags: TagsRecord
}