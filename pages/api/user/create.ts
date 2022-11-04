import { User } from "pocketbase";
import { TypedEndpoint } from "../../../src/lib/types/request";
import pocketbase from "../../../src/pocketbase";

export interface ICreateUserArgs {
  email: string,
  password: string,
}

const handler: TypedEndpoint<ICreateUserArgs, User> = async (req, res) => {
  try {
    const user = await pocketbase.client.users.create({
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.password,
    })
    res.status(200).json(user);
  } catch {
    res.status(400);
  }
}

export default handler;