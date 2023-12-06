import * as env from 'env-var'
import 'dotenv/config'

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
  MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asIntPositive(),
  PROD: env.get('PROD').required().asBool(),
}
