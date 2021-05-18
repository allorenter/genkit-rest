import GeneralError from './general-error';

export default class AlreadyExists extends GeneralError {
  constructor(message) {
    super(message);
    this.message = message;
    this.errorCode = 403;
  }
}
