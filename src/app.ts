import 'dotenv/config'
import { ServerApp } from "./presentation/server.js";
import { envs } from './config/plugins/envs.plugin.js';


(async() => {

    main();

})();

function main() {

    // ServerApp.start();
    console.log(envs.PORT);
    console.log(envs.MAILER_EMAIL);
    console.log(envs.MAILER_SECRET_KEY);
    console.log(envs.PROD);

}