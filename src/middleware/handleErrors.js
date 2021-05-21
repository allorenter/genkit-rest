import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import GeneralError from '../utils/errors/general-error';
import Forbidden from '../utils/errors/forbidden';
import Unauthorized from '../utils/errors/unauthorized';

const returnError = (res, error) => res.status(error.getCode()).json({
  status: 'error',
  message: error.message,
});

// eslint-disable-next-line no-unused-vars
const handleErrors = (err, req, res, next) => {
  if (err instanceof JsonWebTokenError) {
    const newErr = new Forbidden('Token mal formado');
    return returnError(res, newErr);
  }

  if (err instanceof TokenExpiredError) {
    const newErr = new Unauthorized('El token ha expirado');
    return returnError(res, newErr);
  }

  if (err instanceof GeneralError) {
    return returnError(res, err);
  }

  return returnError(res, err);
};

export default handleErrors;
