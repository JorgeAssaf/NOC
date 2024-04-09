
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple"
import { SendLogEmail } from "../domain/use-cases/email/send-email-logs"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { MongoDatasource } from "../infrastructure/datasources/mongo.datasource"
import { PostgresLogDatasource } from "../infrastructure/datasources/postgress.datasource"
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl"
import { EmailService } from "./email/email.service"
import { CronService } from "./cron/cron-service"

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource())

const postgresLogRepository = new LogRepositoryImpl(new PostgresLogDatasource())

const mongoLogRepository = new LogRepositoryImpl(new MongoDatasource())

const email = new EmailService()
export class Server {
  public static async start() {
    console.log('Server is running')


    // const sendEmailLogs = new SendLogEmail(fsLogRepository, email)
    // sendEmailLogs.execute(['jorgeassaf799@gmail.com'])
    // const emailService = new EmailService()
    // emailService.sendEmailWithLogs('Jorgeassaf799@gmail.com')

    // CronService.createJob('0 0 * * * *', () => {

    //   new CheckServiceMultiple(
    //     [fsLogRepository, mongoLogRepository, postgresLogRepository],
    //     () => console.log('success'),
    //     (error) => console.log(error),
    //   ).execute('https://www.google.com')

    // })
  }
}
