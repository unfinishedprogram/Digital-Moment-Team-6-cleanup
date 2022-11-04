import { TypedEndpoint } from "../../../src/lib/types/request";

export interface ICreateUserArgs {
  username: string,
  password: string,
}

export interface ICreateUserResponse {
  status: "error" | "success",
  message: string,
}


const handler: TypedEndpoint<ICreateUserArgs, ICreateUserResponse> = (req, res) => {
  // Duplicate username
  // Invalid password
  res.status(200).json({
    status: "error",
    message: ""
  });
}

export default handler;