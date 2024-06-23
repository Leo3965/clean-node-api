export class InvalidParameterError extends Error {
  constructor(param: string) {
    super(`Invalid parameter ${param}`)
    this.name = InvalidParameterError.name
  }
}
