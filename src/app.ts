import { envs } from '@/config/plugins/envs.plugin'
import { MongoDataBase } from '@/data/mongo/init'
import { Server } from '@/presentation/server'

async function main() {
  await MongoDataBase.connect({
    dbName: envs.MONGO_DB_NAME,
    url: envs.MONGO_URL,
  })

  Server.start()
}

main()
