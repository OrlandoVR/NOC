import { PrismaPg } from "@prisma/adapter-pg";
import type { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, type LogSeverityLevel } from "../../domain/entities/log.entity";
import { envs } from "../../config/plugins/envs.plugin";
import { PrismaClient, SeverityLevel } from "../../generated/prisma/client";

const connectionString = `${envs.POSTGRES_URL}`

const adapter = new PrismaPg({connectionString})
const prisma = new PrismaClient({adapter});

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

export class PostgresLogDatasource implements LogDatasource{

    async saveLog(log: LogEntity): Promise<void> {
        
        const level = severityEnum[log.level];

        const newLog = await prisma.logModel.create({
            data: {
                ...log,
                level
            }
        });
    }
    
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    
        const level = severityEnum[severityLevel];
        
        const dbLogs = await prisma.logModel.findMany({
            where: {level}
        })

        return dbLogs.map( dbLog => LogEntity.fromObject(dbLog) )
    }

}