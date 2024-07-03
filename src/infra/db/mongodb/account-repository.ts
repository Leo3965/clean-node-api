import { AddAccountRepository } from '../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../domain/models/account'
import { AddAccountModel } from '../../../domain/usecases/add-account'
import { MongoHelper } from './helpers/helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add(account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(account)
    return Object.assign({}, account, { id: result.insertedId.toString() })
  }
}
