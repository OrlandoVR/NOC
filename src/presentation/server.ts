import { LogSeverityLevel } from "../domain/entities/log.entity.js";
import { CheckServiceMultiple } from "../domain/use-cases/ckecks/check-service-multiple.js";
import { CheckService } from "../domain/use-cases/ckecks/check-service.js";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs.js";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource.js";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log-datasource.js";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource.js";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl.js";
import { CronService } from "./cron/cron-service.js";
import { EmailService } from './email/email.service.js';

const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
);

const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDatasource(),
);

const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource(),
);



const emailService = new EmailService();


export class ServerApp {
  public static async start() {
    console.log("Server started ... ");

    // //todo: Mandar email
    // new SendEmailLogs(
    //   emailService,
    //   logRepository,
    // ).execute(
    //   ['elim13023@gmail.com', 'musicmiu11@gmail.com']
    // )
    // emailService.sendEmailWithFileSystemLogs(
    //   ['elim13023@gmail.com', 'musicmiu11@gmail.com']
    // )

    // const logs = await logRepository.getLogs(LogSeverityLevel.medium);
    // console.log(logs.length);

    CronService.createJob(
        '*/5 * * * * *',
        () => {
            
            const url = 'http://localhost:3000/';
            new CheckServiceMultiple(
                [fsLogRepository, mongoLogRepository, postgresLogRepository],
                () => console.log(`${url} is OK`),
                (error) => console.log(`${error}`)
            ).execute(url);
            // new CheckService().execute('http://localhost:3000/');
        }
    );
  }
}
