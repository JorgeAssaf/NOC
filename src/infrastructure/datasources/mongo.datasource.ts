import { logModel } from '@/data/mongo/models/log.model'
import { LogDatasource } from '@/domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '@/domain/entities/log.entity'

export class MongoDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    await logModel.create(log)
  }
  async getLogs(severity: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await logModel.find({ level: severity })
    return logs.map((log) => LogEntity.fromObject(log))
  }
}
