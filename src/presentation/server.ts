import { CheckService } from '../domain/use-cases/checks/check-service'
import { CronService } from './cron/cron-service'

export class Server {
  public static start(): void {
    console.log('Server is running')

    CronService.createJob('*/5 * * * * *', () => {
      // new CheckService().execute('http://localhost:3000')
      new CheckService(
        () => console.log('Success'),
        (error) => console.log(error),
      ).execute('https://google.com')
    })
  }
}
