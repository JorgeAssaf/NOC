import { connect } from "mongoose"
interface MongoDataBaseOptions {
  dbName: string
  url: string
}

export class MongoDataBase {
  static async connect({ dbName, url }: MongoDataBaseOptions) {
    try {
      await connect(url, {
        dbName,
      })
      console.log(`MongoDB connected to ${url}`)
    } catch (error) {
      console.log(`MongoDB connection error: ${error}`)
    }
  }
}
