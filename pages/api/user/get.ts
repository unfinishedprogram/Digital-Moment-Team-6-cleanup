import type { NextApiRequest, NextApiResponse } from 'next';
import { TypedGetEndpoint } from "../../../src/lib/types/request";

export type GetUserQueryParams = {
  id: string;
}

export type User = {
  firstName: "John",
  lastName: "Last Name"
}

// const handler : TypedEndpoint<{}, 

const handler: TypedGetEndpoint<GetUserQueryParams, User> = (req, res) => {
  const { id } = req.query;
  console.log(req.query.id);
  if (id == undefined) {
    res.status(400);
    return;
  }

  res.status(200).json({
    firstName: "John",
    lastName: "Last Name",
  });


}

export default handler;
