import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { MissingParameterError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParameterError('name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParameterError('email'))
    }
  }
}
