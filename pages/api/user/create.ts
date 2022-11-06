import { User } from "pocketbase";
import { TypedEndpoint } from "../../../src/lib/types/request";
import pocketbase from "../../../src/pocketbase";

export interface ICreateUserArgs {
  email: string,
  password: string,
}

const handler: TypedEndpoint<ICreateUserArgs, User> = async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.password,
  }

  pocketbase.client.users.create(data).then(data => {
    res.status(200).json(data);
  }).catch(error => {
    res.status(400).send(error.data);
  })
}

export default handler;