import { RecordIdString, TagsRecord } from "../../src/lib/types/pocket";
import pocketbase from "../../src/pocketbase";

export async function getTags(tags: RecordIdString[]): Promise<TagsRecord[]> {
  const pocketBaseInstance = pocketbase;
  return await Promise.all(
    tags.map(tag => pocketbase.getOne("tags", tag))
  );
}
