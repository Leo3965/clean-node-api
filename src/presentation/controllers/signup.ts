import { type HttpRequest, type Http } from '../protocols/http'
import { MissingParameterError } from '../errors/missing-param-error'

export class SignUpController {
  handle(httpRequest: HttpRequest): Http {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParameterError('name')
      }
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParameterError('email')
      }
    }
  }
}
