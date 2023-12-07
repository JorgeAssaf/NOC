import { LogEntity, LogSeverityLevel } from '@/domain/entities/log.entity'
import { LogRepository } from '@/domain/repository/log.repository'
import { EmailService } from '@/presentation/email/email.service'

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
