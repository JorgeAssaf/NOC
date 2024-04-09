import { LogEntity, LogSeverityLevel } from "../../entities/log.entity"
import type { LogRepository } from "../../repository/log.repository"

interface CheckServiceMultipleUseCase {
  execute: (url: string) => Promise<boolean>
}

type SuccessCallback = (() => void) | undefined
type ErrorCallback = ((error: string) => void) | undefined

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private logRepository: LogRepository[],
    private readonly successCallback?: SuccessCallback,
    private readonly errorCallback?: ErrorCallback,
  ) { }
  private allLogs(log: LogEntity) {
    this.logRepository.forEach((logRepository) => {
      logRepository.saveLog(log)
    })
  }
  private getLogs(severity: LogSeverityLevel) {
    return this.logRepository.forEach((logRepository) => logRepository.getLogs(severity))

  }

  public async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Error on check service ${url}`)
      }
      const log = new LogEntity({
        message: `${url} is ok`,
        level: LogSeverityLevel.low,
        origin: 'CheckService',
      })
      this.allLogs(log)
      this.successCallback && this.successCallback()
      return true
    } catch (error) {
      const log = new LogEntity({
        message: `${url} is not ok ${error}`,
        level: LogSeverityLevel.high,
        origin: 'CheckService',
      })
      this.allLogs(log)

      this.getLogs(LogSeverityLevel.high)
      this.errorCallback && this.errorCallback(`${url} is not ok ${error}`)
      return false
    }
  }
}
