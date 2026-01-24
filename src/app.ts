import 'dotenv/config'
import { ServerApp } from "./presentation/server.js";
import { MongoDatabase } from './data/mongo/index.js';
import { envs } from './config/plugins/envs.plugin.js';

(async() => {

    main();

})();

async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    ServerApp.start();


}