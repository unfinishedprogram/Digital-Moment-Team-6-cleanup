import { TypedPostEndpoint } from "../../../src/lib/types/request";
import { AgeGroup, Profile } from "../../../src/lib/types/fullPocketTypes";
import pocketbase from "../../../src/pocketbase";
import { User } from "pocketbase";
import { BaseConverter, getTagIds } from "../../../src/lib/types/type-mapper";

export type AddUserProfileParams =
  Profile
  & Pick<User, "email">
  & { password: string };
export type AddUserProfileReturns = {id: string};

const handler: TypedPostEndpoint<AddUserProfileParams, AddUserProfileReturns> = async (req, res) => {
  const pocketBaseConnection = await pocketbase.getConnection();
  const pocketBaseInstance = pocketbase;
  try {
    const userRecord = await pocketBaseConnection.users.create({
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.password
    });
    const profileRecord = await pocketBaseInstance.add(
      "profiles",
      {
        userId: userRecord.id,
        username: req.body.username,
        age_group: (req.body.age_group as BaseConverter<AgeGroup>).id,
        preferences: getTagIds(req.body.preferences) as unknown as string,
        location: getTagIds(req.body.preferences) as unknown as string
      }
    );
    res.status(200).json({id: userRecord.id});
  } catch (error) {
    res.status(404).json(undefined);
  }
}

export default handler;