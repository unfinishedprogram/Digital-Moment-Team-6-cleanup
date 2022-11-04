import PocketBase from 'pocketbase';

class PocketBaseClient {
    private static url: string;
    private static username: string;
    private static password: string;

    private _client: PocketBase;


    static {
        this.url = "http://127.0.0.1:8090";
        // TODO Use environment variables instead of hardcoding
        this.username = "admin@admin.com";
        this.password = "adminpassword";
    }



    constructor() {
        this._client = new PocketBase(PocketBaseClient.url);
        this.login();
    }


    get client() {
        return this._client;
    }

    get records() {
        return this._client.records;
    }


    private login() {
        this._client.admins.authViaEmail(
            PocketBaseClient.username,
            PocketBaseClient.password
        );
    }


    logout() {
        this._client.authStore.clear();
    }
}

export default new PocketBaseClient();
