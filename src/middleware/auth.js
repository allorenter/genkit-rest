import jwt from 'jsonwebtoken';
import Unauthorized from '../utils/errors/unauthorized';
import Forbidden from '../utils/errors/forbidden';
import GeneralError from '../utils/errors/general-error';

exports.isAuth = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Forbidden('No tienes autorización');
    }
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.SECRET_TOKEN, (err) => {
      if (err.name === 'JsonWebTokenError') {
        throw new Forbidden('Token mal formado');
      }
      if (err.name === 'TokenExpiredError') {
        throw new Unauthorized('El token ha expirado');
      }
      throw new GeneralError('Ha ocurrido un error');
    });
    next();
    return payload;
  } catch (err) {
    next(err);
    return null;
  }
};
