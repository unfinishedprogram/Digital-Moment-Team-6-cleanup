import qs from "qs";
import { GetUserQueryParams, GetUserReturnParams } from "../pages/api/user/get-user-profile";
import { AddUserProfileParams, AddUserProfileReturns } from "../pages/api/user/add-user-profile";
import { AddPostBodyParams, AddPostReturnParams } from "../pages/api/post/add-post";
import { GetPostQueryParams, GetPostReturnParams } from "../pages/api/post/get-post";
import { AddCommentBodyParams, AddCommentReturnParams } from "../pages/api/comment/add-comment";
import { GetCommentQueryParams, GetCommentReturnParams } from "../pages/api/comment/get-comment";
import { GetTagQueryParams, GetTagReturnParams } from "../pages/api/tag/get-tag";
import { GetPostCommentsQueryParams, GetPostCommentsReturnParams } from "../pages/api/post/get-post-comments";
import { GetAllPostsQueryParams, GetAllPostsReturnParams } from "../pages/api/post/get-all-posts";
import { GetTagLocQueryParams, GetTagLocReturnParams } from "../pages/api/tag/get-tag-loc";
import pocketbase from "./pocketbase";
import { PostInfosRecord, ReactionsRecord, RecordIdString } from "./lib/types/pocket";
import { BaseConverter, getTags } from "./lib/types/type-mapper";
import { Profile } from "./lib/types/fullPocketTypes";


type EndpointHandler<D, T> = (args: D) => Promise<T>;

interface IPostEndpoints {
}

interface IGetEndpoints {
  "user/get-user-profile": EndpointHandler<GetUserQueryParams, GetUserReturnParams>
  "post/get-post": EndpointHandler<GetPostQueryParams, GetPostReturnParams>
  "tag/get-tag": EndpointHandler<GetTagQueryParams, GetTagReturnParams>
  "comment/get-comment": EndpointHandler<GetCommentQueryParams, GetCommentReturnParams>
}
const endpoints: IGetEndpoints = {
  "user/get-user-profile": async (req) => {
    const { userId } = req;

    if (userId == undefined) {
      return undefined;
    }
    const pocketBaseConnection = await pocketbase.getConnection();
    const pocketBaseInstance = pocketbase;

    try {
      const userRecord = await pocketBaseConnection.users.getOne(userId);
      const profileRecord = await pocketBaseInstance.getOne("profiles", userRecord.profile!.id);

      const { age_group, preferences, location, ...response } = { ...profileRecord };
      const responseAgeGroup = await pocketBaseInstance.getOne("age_groups", profileRecord.age_group);
      const responsePreferences = await getTags(profileRecord.preferences as unknown as RecordIdString[]);
      const responseLocation = await pocketBaseInstance.getOne("tags", profileRecord.location);

      return {
        "age_group": responseAgeGroup,
        "preferences": responsePreferences,
        "location": responseLocation,
        ...response
      };
    } catch (error) {
      return undefined;
    }
  },
  "post/get-post": async (req) => {
    const { postId } = req;
    if (postId == undefined) {
      return undefined;
    }
    const pocketBaseInstance = pocketbase;

    try {
      const postRecord = await pocketBaseInstance.getOne("posts", postId);
      const postInfo = await pocketBaseInstance.getOne("post_infos", postRecord.post_info);
      const { post_info, tags, author, ...response } = { ...postInfo, ...postRecord };
      const responseTags = await getTags(tags as unknown as RecordIdString[]);
      const responseAuthor = await Api.makeGetRequest("user/get-user-profile", { userId: postInfo.author }) as Profile;
      const responseReactions = await getReactions((postInfo as BaseConverter<PostInfosRecord>).id);
      return {
        "tags": responseTags,
        "author": responseAuthor,
        "reactions": responseReactions,
        ...response
      };
    } catch (error) {
      return undefined;
    }
  },
  "tag/get-tag": async (req) => {
    const { tagId } = req;
    if (tagId == undefined) {
      return undefined;
    }
    const pocketBaseInstance = pocketbase;

    try {
      const response = await pocketBaseInstance.getOne("tags", tagId);

      return response;
    } catch (error) {
      return undefined;
    }
  },
  "comment/get-comment": async (req) => {
    const { commentId } = req;
    if (commentId == undefined) {
      return undefined;
    }
    const pocketBaseInstance = pocketbase;

    try {
      const postRecord = await pocketBaseInstance.getOne("comments", commentId);
      const postInfo = await pocketBaseInstance.getOne("post_infos", postRecord.post_info);

      const { post_info, author, ...response } = { ...postInfo, ...postRecord };
      const responseAuthor = await Api.makeGetRequest("user/get-user-profile", { userId: postInfo.author }) as Profile;
      const responseReactions = await getReactions((postInfo as BaseConverter<PostInfosRecord>).id);

      return {
        "author": responseAuthor,
        "reactions": responseReactions,
        ...response
      };
    } catch (error) {
      return undefined;
    }
  }
}

const wait = async () => new Promise<undefined>((res, rej) => setTimeout(() => res(undefined), 1000))

export default class Api {
  private static baseURL = "http://localhost:3000/api"

  public static async makeGetRequest<R extends keyof IGetEndpoints, D extends Parameters<IGetEndpoints[R]>, T extends ReturnType<IGetEndpoints[R]>>(route: R, ...args: D): Promise<T> {
    // console.log(JSON.stringify(Ob);

    return await endpoints[route](args[0] as any) as T;
  }
}

async function getReactions(postInfoId: RecordIdString): Promise<Record<string, number>> {
  const pocketBaseInstance = pocketbase;
  const reactions = await pocketBaseInstance.getList("reactions");
  const reactionsCounts =
    await Promise.all(
      reactions.map(
        async (reaction) => {
          try {
            const reactionRecord = reaction as BaseConverter<ReactionsRecord>;

            const reactionList =
              await pocketBaseInstance.getList("reactions_to_posts",
                `(reaction = '${reactionRecord.id}' && post_info = '${postInfoId}')`);
            return reactionList.length;
          }
          catch (e) {
            return 0;
          }
        }
      )
    );
  const zipped: Record<string, number> = {};
  for (const i in reactions) {
    zipped[reactions[i].name] = reactionsCounts[i];
  }
  return zipped;
}
