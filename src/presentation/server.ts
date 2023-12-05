import { CheckService } from '../domain/use-cases/checks/check-service'
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource'
import { LogRepositoryImpl } from '../infrastructure/repository/log.repository.impl'
import { CronService } from './cron/cron-service'

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
)
export class Server {
  public static start(): void {
    console.log('Server is running')

    CronService.createJob('*/10 * * * * *', () => {
      // new CheckService().execute('http://localhost:3000')
      new CheckService(
        fileSystemLogRepository,
        () => console.log('Success'),
        (error) => console.log(error),
      ).execute('https://www.google.com')
    })
  }
}
