import { SignUpController } from '../../presentation/controllers/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { LogControllerDecorator } from '../decorators/log-controller-decorator'
import { Controller } from '../../presentation/protocols'

export function SignUpControllerFactory(): Controller {
  const bcrypt = new BcryptAdapter()
  const repository = new AccountMongoRepository()
  const useCase = new DbAddAccount(bcrypt, repository)
  const emailValidator = new EmailValidatorAdapter()
  return new LogControllerDecorator(
    new SignUpController(emailValidator, useCase)
  )
}
