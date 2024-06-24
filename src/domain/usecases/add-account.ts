import { type AccountModel } from '../models/account'

export class AddAccountModel {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add: (account: AddAccountModel) => AccountModel
}
