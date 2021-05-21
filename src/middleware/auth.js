import jwt from 'jsonwebtoken';
import Forbidden from '../utils/errors/forbidden';

exports.isAuth = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Forbidden('No tienes autorización');
    }
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.SECRET_TOKEN);
    req.payload = payload;
    req.token = token;
    next();
    return payload;
  } catch (err) {
    next(err);
    return null;
  }
};
