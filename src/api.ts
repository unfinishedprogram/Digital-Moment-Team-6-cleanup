import { DemoArgs, DemoReturn } from "../pages/api/demo";
import qs from "qs";
import { GetUserQueryParams, User } from "../pages/api/user/get";

type EndpointHandler<D, T> = (args: D) => T;

interface IPostEndpoints {
  "demo": EndpointHandler<DemoArgs, DemoReturn>,
}

interface IGetEndpoints {
  "user/get": EndpointHandler<GetUserQueryParams, User>
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

      if (response.status != 200) {
        res(response.json());
      } else {
        rej(response.statusText);
      }
    });
  }

  public static async makeRequest<R extends keyof IPostEndpoints, D extends Parameters<IPostEndpoints[R]>, T extends ReturnType<IPostEndpoints[R]>>(route: R, ...args: D): Promise<T> {
    return new Promise(async (res, rej) => {
      const response = await fetch(`${this.baseURL}/${route}`, {
        method: 'POST',
        body: JSON.stringify(args)
      });

      if (response.status != 200) {
        res(response.json());
      } else {
        rej(response.statusText);
      }
    });
  }
}
