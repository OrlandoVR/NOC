import { CheckService } from "../domain/use-cases/ckecks/check-service.js";
import { CronService } from "./cron/cron-service.js";

export class ServerApp {
  public static start() {
    console.log("Server started ... ");

    CronService.createJob(
        '*/5 * * * * *',
        () => {
            const url = 'https://google.com';
            new CheckService(
                () => console.log(`${url} is OK`),
                (error) => console.log(`${error}`)
            ).execute(url);
            // new CheckService().execute('https://google.com');
        }
    );
  }
}
