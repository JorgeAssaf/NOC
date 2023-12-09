import { describe, expect, it, vi } from 'vitest'
import { envs } from './envs.plugin'

describe('Envs Plugin', () => {
  it('should return the correct values', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_EMAIL: 'jorgeassaf@google.com',
      MAILER_SERVICE: 'gmail',
      MAILER_SECRET_KEY: '1233',
      MONGO_URL: 'mongodb://assaf:123456789@localhost:27017/NOC-TEST',
      MONGO_USER: 'assaf',
      MONGO_PASSWORD: '123456789',
      MONGO_DB_NAME: 'NOC-TEST',
      POSTGRES_DB: "NOC-TEST",
      POSTGRES_PASSWORD: "root",
      POSTGRES_URL: "postgres://assaf:123456789@localhost:5432/NOC-TEST",
      POSTGRES_USER: "assaf",
    })
  })

  it('should return the error', async () => {
    vi.resetModules()
    process.env.PORT = 'ABC'
    try {
      await import('./envs.plugin')
    } catch (error) {
      expect(`${error}`).contain('"PORT" should be a valid integer')
    }
  })
})
