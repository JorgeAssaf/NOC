import { LogEntity, LogSeverityLevel } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"

interface CheckServiceUseCase {
  execute: (url: string) => Promise<boolean>
}

type SuccessCallback = () => void
type ErrorCallback = (error: string) => void

export class CheckService implements CheckServiceUseCase {
  constructor(
    private logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
  ) { }

  public async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Error on check service ${url}`)
      }
      const log = new LogEntity(url, LogSeverityLevel.low)
      this.logRepository.saveLog(log)
      this.successCallback()
      return true
    } catch (error) {
      this.logRepository.saveLog(new LogEntity(`${url} is not ok ${error}`, LogSeverityLevel.high))
      this.errorCallback(`${error}`)
      return false
    }
  }
}
