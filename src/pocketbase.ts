import PocketBase, { Record } from 'pocketbase';
import {CollectionRecords, Collections} from './lib/types/pocket';

type Filter = "=" | "!=" | ">" | ">=" | "<" | "<=" | "~" | "!~"
type FilterRule<T extends keyof CollectionRecords> = `(${string & keyof CollectionRecords[T]} ${Filter} '${string}')`
class PocketBaseInstance {
  private static url: string;
  private static username: string;
  private static password: string;

  private _connection: Promise<PocketBase> | null;


  static {
    // TODO Use environment variables instead of hardcoding
    this.url = "http://127.0.0.1:8090";
    this.username = process.env.DM_DB_EMAIL!;
    this.password = process.env.DM_DB_PASSWORD!;
  }



  constructor() {
    this._connection = null;
  }

  public async add<T extends keyof CollectionRecords>(collection: T, obj: CollectionRecords[T]): Promise<CollectionRecords[T] & Record> {
    const client = await this.getConnection();
    return await client.records.create(collection, obj) as any;
  }

  public async getOne<T extends keyof CollectionRecords>(collection: T, id: string): Promise<CollectionRecords[T]> {
    const client = await this.getConnection();
    return await (client.records.getOne(collection, id) as unknown as Promise<CollectionRecords[T]>);
  }

  public async getList<T extends keyof CollectionRecords>(collection: T, filterRule?: FilterRule<T>): Promise<CollectionRecords[T][]>{
    const client = await this.getConnection();
    return (await client.records.getFullList(collection, 200, {
      filter: filterRule
    })) as unknown as Promise<CollectionRecords[T][]>
  }


  private async connect() {
    if (!this._connection) {
      // Establish session
      this._connection = this.establishConnection();
    }
  }

  async getConnection() {
    await this.connect();
    return (await this._connection)!;
  }


  private async establishConnection() {
    const client = new PocketBase(PocketBaseInstance.url);
    // Get authentication data
    console.log(PocketBaseInstance.username);
    const authData = await client.admins.authViaEmail(
      "admin@admin.com",
      "adminpassword"
    );
    // Log in
    client.authStore.save(authData.token, authData.admin);
    return client;
  }
}

const instance = new PocketBaseInstance();

export default instance;
