import {
  type Controller,
  type HttpRequest,
  type HttpResponse
} from '../protocols'
import { InvalidParameterError, MissingParameterError } from '../errors'
import { badRequest, ok, serverError } from '../helpers/http-helper'
import { type AddAccount } from '../../domain/usecases/add-account'
import { type EmailValidator } from '../protocols/email-validator'

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'email',
        'name',
        'password',
        'passwordConfirmation'
      ]

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParameterError(field))
        }
      }

      const { email, password, passwordConfirmation, name } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParameterError('passwordConfirmation'))
      }

      const isValidEmail = this.emailValidator.isValid(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParameterError('email'))
      }

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (err) {
      return serverError()
    }
  }
}
