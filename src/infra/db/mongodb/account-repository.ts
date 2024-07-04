import { AddAccountRepository } from '../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../domain/models/account'
import { AddAccountModel } from '../../../domain/usecases/add-account'
import { MongoHelper } from './helpers/mongo-helper'
import { MongoMapper } from './mongo-mapper'

export class AccountMongoRepository implements AddAccountRepository {
  async add(account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const id = await accountCollection.insertOne(account)
    return MongoMapper.map(account, id.insertedId.toString())
  }
}
