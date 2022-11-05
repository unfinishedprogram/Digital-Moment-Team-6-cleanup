import { NextApiRequest, NextApiResponse } from "next";

export interface TypedPostRequest<T> extends NextApiRequest {
    body: T,
}

type QueryString =  Partial<{
    [key: string]: string | string[];
}>;

export interface TypedGetRequest<T extends QueryString> extends NextApiRequest {
    query: Partial<T>,
}

export type TypedPostEndpoint<D, T> = (res: TypedPostRequest<D>, req: NextApiResponse<T>) => void;

export type TypedGetEndpoint<D extends QueryString, T> = (req: TypedGetRequest<D>, res: NextApiResponse<T>) => void;
