import { Collection, MongoClient } from 'mongodb'
import config from '../../../../utils/config'

export const MongoHelper = {
  client: null as MongoClient,

  async connect(): Promise<void> {
    this.client = await MongoClient.connect(config.mongoURI)
  },

  async disconnect(): Promise<void> {
    await this.client.close()
  },

  getCollection(collectionName: string): Collection {
    return this.client.db().collection(collectionName)
  },

  async findById<T>(id: string): Promise<T> {
    return await this.client.db().findOne({ where: { id } })
  }
}
