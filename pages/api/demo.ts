// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TypedEndpoint } from '../../src/lib/types/request';


export interface DemoArgs {
  arg1: string,
  other: number,
}

export interface DemoReturn {
  returnValue: string,
}

const handler: TypedEndpoint<DemoArgs, DemoReturn> = (req, res) => {
  res.status(200).json({ returnValue: "return" });
}

export default handler;