import qs from "qs";
import { GetUserQueryParams } from "../pages/api/user/get";
import { User } from "pocketbase";
import { AddUserProfileParams, AddUserProfileReturns } from "../pages/api/user/add-user-profile";
import { PostsRecord, ProfilesRecord } from "./lib/types/pocket";
import { AddPostBodyParams, AddPostReturnParams } from "../pages/api/post/add-post";
import { GetPostQueryParams, GetPostReturnParams } from "../pages/api/post/get-post";

type EndpointHandler<D, T> = (args: D) => T;

interface IPostEndpoints {
  "user/add-user-profile": EndpointHandler<AddUserProfileParams, AddUserProfileReturns>,
  "post/add-post": EndpointHandler<AddPostBodyParams, AddPostReturnParams>
}

interface IGetEndpoints {
  "user/get": EndpointHandler<GetUserQueryParams, ProfilesRecord>
  "post/get-post": EndpointHandler<GetPostQueryParams, GetPostReturnParams>
}


export default class Api {
  private static baseURL = "http://localhost:3000/api"

  public static async makeGetRequest<R extends keyof IGetEndpoints, D extends Parameters<IGetEndpoints[R]>, T extends ReturnType<IGetEndpoints[R]>>(route: R, ...args: D): Promise<T> {
    // console.log(JSON.stringify(Ob);
    const source = {};
    args.forEach(o => Object.assign(source, o));
    return new Promise(async (res, rej) => {
      const response = await fetch(`${this.baseURL}/${route}?${qs.stringify(source)}`, {
        method: 'GET',
      });

      if (response.status == 200) {
        res(response.json());
      } else {
        rej(response.statusText);
      }
    });
  }

  public static async makePostRequest<R extends keyof IPostEndpoints, D extends Parameters<IPostEndpoints[R]>[0], T extends ReturnType<IPostEndpoints[R]>>(route: R, args: D): Promise<T> {
    return new Promise(async (res, rej) => {
      const response = await fetch(`${this.baseURL}/${route}`, {
        method: 'POST',
        body: JSON.stringify(args),
        headers: {
          "content-type": "application/json"
        }
      });

      if (response.status == 200) {
        res(response.json());
      } else {
        rej(response.statusText);
      }
    });
  }
}
