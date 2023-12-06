import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'


interface SendEmailOptions {
  to: string | string[]
  subject: string
  html: string
  attachments?: Attachments[]
}

interface Attachments {
  filename: string
  path: string
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  })
  constructor() { }

  private async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, html, attachments } = options
    try {
      await this.transporter.sendMail({
        to,
        subject,
        html,
        attachments,
      })

      return true
    } catch (error) {
      return false
    }
  }

  async sendEmailWithLogs(to: string | string[]) {
    const subject = 'Logs - NOC'
    const html = `
      <h1>Logs</h1>
      <p>Logs from all, medium and high severity levels</p>
    `
    const attachments: Attachments[] = [
      {
        filename: 'logs-all.log',
        path: './logs/logs-all.log',
      },
      {
        filename: 'logs-high.log',
        path: './logs/logs-high.log',
      },
      {
        filename: 'logs-medium.log',
        path: './logs/logs-medium.log',
      },
    ]

    this.sendEmail({
      to,
      subject,
      html,
      attachments,
    })
    return true
  }
}
