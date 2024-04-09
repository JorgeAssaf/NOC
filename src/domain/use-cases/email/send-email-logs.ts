import type { EmailService } from "../../../presentation/email/email.service"
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity"
import type { LogRepository } from "../../repository/log.repository"

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>
}

export class SendLogEmail implements SendLogEmailUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly emailService: EmailService,
  ) { }

  async execute(to: string | string[]) {
    try {
      const sent = await this.emailService.sendEmailWithLogs(to)

      if (!sent) {
        throw new Error('Email not sent')
      }
      const log = new LogEntity({
        message: `Email sent to ${to}`,
        level: LogSeverityLevel.low,
        origin: 'SendLogEmail',
      })
      this.logRepository.saveLog(log)
      return true
    } catch (error) { }
    return true
  }
}
