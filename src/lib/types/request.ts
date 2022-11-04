import { NextApiRequest, NextApiResponse } from "next";

export default interface TypedAPIRequest<T> extends NextApiRequest {
    body: T,
}

export type TypedEndpoint<D, T> = (res: TypedAPIRequest<D>, req: NextApiResponse<T>) => void;