import { connect } from "mongoose"
interface MongoDataBaseOptions {
  dbName: string
  url: string
}

export class MongoDataBase {
  static async connect(options: MongoDataBaseOptions) {
    const { dbName, url } = options
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
