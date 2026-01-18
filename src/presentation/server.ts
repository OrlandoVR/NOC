import { CheckService } from "../domain/use-cases/ckecks/check-service.js";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource.js";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl.js";
import { CronService } from "./cron/cron-service.js";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource
);

export class ServerApp {
  public static start() {
    console.log("Server started ... ");

    CronService.createJob(
        '*/5 * * * * *',
        () => {
            
            const url = 'http://localhost:3000/';
            new CheckService(
                fileSystemLogRepository,
                () => console.log(`${url} is OK`),
                (error) => console.log(`${error}`)
            ).execute(url);
            // new CheckService().execute('http://localhost:3000/');
        }
    );
  }
}
