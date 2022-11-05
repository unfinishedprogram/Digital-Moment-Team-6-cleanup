import { User } from "pocketbase";
import { TypedPostEndpoint } from "../../../src/lib/types/request";
import pocketbase from "../../../src/pocketbase";

export interface ICreateUserArgs {
  email: string,
  password: string,
  location: string;
  age: string;
  preferences: string[];
  languages: string[];  
}

const handler: TypedPostEndpoint<ICreateUserArgs, User> = async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.password,
  }
  const connection = await pocketbase.getConnection();
  connection.users.create(data).then(data => {
    res.status(200).json(data);
  }).catch(error => {
    res.status(400).send(error.data);
  })
}

export default handler;