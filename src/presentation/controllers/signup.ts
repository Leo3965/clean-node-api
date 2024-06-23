import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { MissingParameterError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { type Controller } from '../protocols/controller'

export class SignUpController implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = [
      'email',
      'name',
      'password',
      'password_confirmation'
    ]
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParameterError(field))
      }
    }
  }
}
