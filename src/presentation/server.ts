import { CheckService } from "../domain/use-cases/ckecks/check-service.js";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs.js";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource.js";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl.js";
import { CronService } from "./cron/cron-service.js";
import { EmailService } from './email/email.service.js';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource
);
const emailService = new EmailService();


export class ServerApp {
  public static start() {
    console.log("Server started ... ");

    //todo: Mandar email
    new SendEmailLogs(
      emailService,
      fileSystemLogRepository,
    ).execute(
      ['elim13023@gmail.com', 'musicmiu11@gmail.com']
    )
    // emailService.sendEmailWithFileSystemLogs(
    //   ['elim13023@gmail.com', 'musicmiu11@gmail.com']
    // )

    // CronService.createJob(
    //     '*/5 * * * * *',
    //     () => {
            
    //         const url = 'http://localhost:3000/';
    //         new CheckService(
    //             fileSystemLogRepository,
    //             () => console.log(`${url} is OK`),
    //             (error) => console.log(`${error}`)
    //         ).execute(url);
    //         // new CheckService().execute('http://localhost:3000/');
    //     }
    // );
  }
}
