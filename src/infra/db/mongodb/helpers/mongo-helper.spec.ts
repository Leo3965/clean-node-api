import { MongoHelper } from './mongo-helper'

describe('Mongo helper', () => {
  const sut = MongoHelper
  beforeAll(async () => {
    await sut.connect()
  })

  afterAll(async () => {
    await sut.disconnect()
  })
  test('Should reconnect if db is down', async () => {
    const collection = sut.getCollection('accounts')
    expect(collection).toBeTruthy()
  })
})
