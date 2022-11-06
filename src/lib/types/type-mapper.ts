import { BaseRecord, CollectionRecords, RecordIdString, TagsRecord } from "./pocket";
import pocketbase from "../../pocketbase";

export async function getTags(tags: RecordIdString[]): Promise<TagsRecord[]> {
  const pocketBaseInstance = pocketbase;
  return await Promise.all(
    tags.map(tag => pocketbase.getOne("tags", tag))
  );
}

export function getTagIds(tags: TagsRecord[]): RecordIdString[] {
  return tags.map(tag => (tag as BaseConverter<TagsRecord>).id);
}

export type BaseConverter<T> = BaseRecord & T;
