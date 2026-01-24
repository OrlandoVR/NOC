import console from "node:console";
import { LogModel } from "../../data/mongo/index.js";
import type { LogDatasource } from "../../domain/datasources/log.datasource.js";
import { LogEntity, type LogSeverityLevel } from "../../domain/entities/log.entity.js";


export class MongoLogDatasource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        await newLog.save();
        console.log('Mongo Log created', newLog.id );
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: severityLevel
        });
        
        return logs.map( mongoLog => LogEntity.fromObject(mongoLog) );
    }

}