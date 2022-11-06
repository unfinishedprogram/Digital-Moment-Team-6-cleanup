import { TypedGetEndpoint } from "../../../src/lib/types/request";
import pocketbase from '../../../src/pocketbase';
import { Profile } from "../../../src/lib/types/fullPocketTypes";

export type GetUserQueryParams = {
  userId: string;
}
export type GetUserReturnParams = Profile | undefined;

const handler: TypedGetEndpoint<GetUserQueryParams, GetUserReturnParams> = async (req, res) => {
  const { userId } = req.query;
  if (userId == undefined) {
    res.status(400);
    return;
  }
  const pocketBaseConnection = await pocketbase.getConnection();
  const pocketBaseInstance = pocketbase;

  try {
    const userRecord = await pocketBaseConnection.users.getOne(userId);
    const profileRecord = await pocketBaseInstance.getOne("profiles", userRecord.profile!.id);
    res.status(200).json(profileRecord as any);
  } catch (error) {
    res.status(404).json(undefined);
  }
}

export default handler;
