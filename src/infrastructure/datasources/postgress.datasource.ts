import { PrismaClient } from '@prisma/client'
import { LogDatasource } from '@/domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '@/domain/entities/log.entity'

const prisma = new PrismaClient()

export class PostgresLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    await prisma.logs.create({
      data: {
        ...log,
      },
    })
  }
  async getLogs(severity: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await prisma.logs.findMany({
      where: {
        level: severity,
      },
    })

    return logs.map((log) => LogEntity.fromObject(log))
  }
}
