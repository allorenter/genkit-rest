import GeneralError from './general-error';

export default class Unauthorized extends GeneralError {
  constructor(message) {
    super(message);
    this.message = message;
    this.errorCode = 401;
  }
}
