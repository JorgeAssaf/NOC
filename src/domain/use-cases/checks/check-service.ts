import { LogEntity, LogSeverityLevel } from '../../entities/log.entity'
import { LogRepository } from '../../repository/log.repository'

interface CheckServiceUseCase {
  execute: (url: string) => Promise<boolean>
}

type SuccessCallback = (() => void) | undefined
type ErrorCallback = ((error: string) => void) | undefined

export class CheckService implements CheckServiceUseCase {
  constructor(
    private logRepository: LogRepository,
    private readonly successCallback?: SuccessCallback,
    private readonly errorCallback?: ErrorCallback,
  ) { }

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
      this.logRepository.saveLog(log)
      this.successCallback && this.successCallback()
      return true
    } catch (error) {
      this.logRepository.saveLog(
        new LogEntity({
          message: `${url} is not ok ${error}`,
          level: LogSeverityLevel.high,
          origin: 'CheckService',
        }),
      )
      this.errorCallback && this.errorCallback(`${url} is not ok ${error}`)
      return false
    }
  }
}
