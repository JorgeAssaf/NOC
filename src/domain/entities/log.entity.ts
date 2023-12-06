export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface LogEntityOptions {
  level: LogSeverityLevel
  message: string
  origin: string
  createdAt?: Date
}
export class LogEntity {
  public message: string
  public level: LogSeverityLevel
  public createdAt: Date
  public origin: string
  constructor(options: LogEntityOptions) {
    const { message, level, origin, createdAt = new Date() } = options
    this.message = message
    this.level = level
    this.createdAt = createdAt
    this.origin = origin
  }

  static fromJson(json: string): LogEntity {
    const { message, level, createdAt, origin } = JSON.parse(json)
    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin,
    })
    return log
  }
}
