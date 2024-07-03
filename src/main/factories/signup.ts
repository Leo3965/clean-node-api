import { SignUpController } from '../../presentation/controllers/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'

export function SignUpControllerFactory(): SignUpController {
  const bcrypt = new BcryptAdapter()
  const repository = new AccountMongoRepository()
  const useCase = new DbAddAccount(bcrypt, repository)
  const emailValidator = new EmailValidatorAdapter()
  return new SignUpController(emailValidator, useCase)
}
