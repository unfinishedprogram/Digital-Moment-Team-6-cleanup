import PocketBase from 'pocketbase';


class PocketBaseInstance {
  private static url: string;
  private static username: string;
  private static password: string;

  private _connection: Promise<PocketBase> | null;


  static {
    this.url = "http://127.0.0.1:8090";
    this.username = process.env.DM_DB_EMAIL!;
    this.password = process.env.DM_DB_PASSWORD!;
  }



  constructor() {
    this._connection = null;
  }


  private async connect() {
    if (!this._connection) {
      // Establish session
      this._connection = this.establishConnection();
    }
  }

  async connection() {
    await this.connect();
    return (await this._connection)!.records;
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

const instance = new PocketBaseInstance().connection();

export default instance;
