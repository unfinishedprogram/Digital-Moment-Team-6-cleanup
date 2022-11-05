import type { NextApiRequest, NextApiResponse } from 'next';
import { TypedGetEndpoint } from "../../../src/lib/types/request";
import { ProfilesRecord } from "../../../src/lib/types/pocket";
import pocketbase from '../../../src/pocketbase';

export type GetUserQueryParams = {
  id: string;
}

// const handler : TypedEndpoint<{}, 

const handler: TypedGetEndpoint<GetUserQueryParams, ProfilesRecord> = async (req, res) => {
  const { id } = req.query;
  console.log(req.query.id);
  if (id == undefined) {
    res.status(400);
    return;
  }
  const pocketBaseInstance = pocketbase;

  try {
    const profile = await pocketBaseInstance.getOne("profiles", id)
    res.status(200).json(profile as any);
  } catch (error) {
    res.status(404).json();
  }



}

export default handler;
