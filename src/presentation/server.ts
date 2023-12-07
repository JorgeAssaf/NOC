import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource'
import { PostgresLogDatasource } from '../infrastructure/datasources/postgress.datasource'
import { LogRepositoryImpl } from '../infrastructure/repository/log.repository.impl'
import { EmailService } from './email/email.service'
import { CronService } from './cron/cron-service'
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple'
import { MongoDatasource } from '../infrastructure/datasources/mongo.datasource'

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource())

const postgresLogRepository = new LogRepositoryImpl(new PostgresLogDatasource())

const mongoLogRepository = new LogRepositoryImpl(new MongoDatasource())

const emailService = new EmailService()
export class Server {
  public static async start() {
    console.log('Server is running')


    // const createLog = await prisma.logs.create({
    //   data: {
    //     message: 'test',
    //     level: LevelSeverity.low,
    //     origin: 'App.ts',
    //   },
    // })
    //TODO seend email
    // const sendEmailLogs = new SendLogEmail(fileSystemLogRepository, emailService)
    // sendEmailLogs.execute(['jorgeassaf799@gmail.com'])
    // const emailService = new EmailService(fileSystemLogRepository)
    // emailService.sendEmailWithLogs('Jorgeassaf799@gmail.com')

    // CronService.createJob('*/10 * * * * *', () => {
    //   new CheckServiceMultiple(
    //     [fileSystemLogRepository, mongoLogRepository, postgresLogRepository],
    //     () => console.log('success'),
    //     (error) => console.log(error),
    //   ).execute('https://www.google.com')
    // })
  }
}
