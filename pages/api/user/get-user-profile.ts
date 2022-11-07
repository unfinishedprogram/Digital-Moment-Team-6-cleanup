import { TypedGetEndpoint } from "../../../src/lib/types/request";
import pocketbase from '../../../src/pocketbase';
import { Profile } from "../../../src/lib/types/fullPocketTypes";
import { getTags } from "../../../src/lib/types/type-mapper";
import { RecordIdString } from "../../../src/lib/types/pocket";

export type GetUserQueryParams = {
  userId: string;
}
export type GetUserReturnParams = Profile | undefined;

const handler: TypedGetEndpoint<GetUserQueryParams, GetUserReturnParams> = async (req, res) => {
  const { userId } = req.query;
  if (userId == undefined) {
    res.status(400).send(undefined);
    return;
  }
  const pocketBaseConnection = await pocketbase.getConnection();
  const pocketBaseInstance = pocketbase;

  try {
    const userRecord = await pocketBaseConnection.users.getOne(userId);
    const profileRecord = await pocketBaseInstance.getOne("profiles", userRecord.profile!.id);

    const {age_group, preferences, location, ...response} = {...profileRecord};
    const responseAgeGroup = await pocketBaseInstance.getOne("age_groups", profileRecord.age_group);
    const responsePreferences = await getTags(profileRecord.preferences as unknown as RecordIdString[]);
    const responseLocation = await pocketBaseInstance.getOne("tags", profileRecord.location);

    res.status(200).json({
      "age_group": responseAgeGroup,
      "preferences": responsePreferences,
      "location": responseLocation,
      ...response
    });
  } catch (error) {
    res.status(404).json(undefined);
  }
}

export default handler;
