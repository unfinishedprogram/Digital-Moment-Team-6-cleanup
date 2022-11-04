import { DemoArgs, DemoReturn } from "../pages/api/demo";

type EndpointHandler<D, T> = (args: D) => T;

interface IEndpoints {
  "demo": EndpointHandler<DemoArgs, DemoReturn>,
}


export default class Api {
  private static baseURL = "http://localhost:3000/api"

  public static async makeRequest<R extends keyof IEndpoints, D extends Parameters<IEndpoints[R]>, T extends ReturnType<IEndpoints[R]>>(route: R, ...args: D): Promise<T> {
    const res = await fetch(`${this.baseURL}/${route}`, {
      method: 'POST',
      body: JSON.stringify(args)
    });

    return res.json()
  }
}