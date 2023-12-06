import { CheckService } from '../domain/use-cases/checks/check-service'
import { SendLogEmail } from '../domain/use-cases/email/send-email-logs'
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource'
import { LogRepositoryImpl } from '../infrastructure/repository/log.repository.impl'
import { CronService } from './cron/cron-service'
import { EmailService } from './email/email.service'

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
)
const emailService = new EmailService()
export class Server {
  public static start(): void {
    console.log('Server is running')

    //TODO seend email
    // const sendEmailLogs = new SendLogEmail(fileSystemLogRepository, emailService)
    // sendEmailLogs.execute(['jorgeassaf799@gmail.com'])
    // const emailService = new EmailService(fileSystemLogRepository)
    // emailService.sendEmailWithLogs('Jorgeassaf799@gmail.com')
    // CronService.createJob('*/10 * * * * *', () => {
    //   new CheckService(
    //     fileSystemLogRepository,
    //   ).execute('https://www.google.com')
    // })
  }
}
