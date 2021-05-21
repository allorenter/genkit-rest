import succesResponse from '../../utils/response';
import User from './user.model';
import BadRequest from '../../utils/errors/bad-request';
import AlreadyExists from '../../utils/errors/already-exists';
import UserService from './user.service';
import Unauthorized from '../../utils/errors/unauthorized';

exports.userExists = async (req, res, next) => {
  try {
    const { userName } = req.params;
    const userExists = await User.countDocuments({ userName }) > 0;
    return succesResponse(res, 'Usuario existe', { userName, exists: userExists });
  } catch (err) {
    next(err);
    return null;
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      throw new BadRequest('userName y password requeridos');
    }
    if (await User.countDocuments({ userName }) > 0) {
      throw new AlreadyExists('userName ya existe');
    }
    const user = new User({ userName, password });
    user.save();
    return succesResponse(res, 'Usuario creado', { user, token: UserService.createToken(user) });
  } catch (err) {
    next(err);
    return null;
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      throw new BadRequest('userName y password requeridos');
    }
    if (await User.countDocuments({ userName }) > 0) {
      throw new AlreadyExists('userName ya existe');
    }
    const user = new User({ userName, password });
    user.save();
    return succesResponse(res, 'Usuario creado', user);
  } catch (err) {
    next(err);
    return null;
  }
};

exports.checkAuth = async (req, res, next) => {
  try {
    return succesResponse(res, 'Autorización correcta', {
      userName: req.payload.userName,
      token: req.token,
    });
  } catch (err) {
    next(err);
    return null;
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      throw new BadRequest('userName y password requeridos');
    }
    const user = await User.findOne({ userName, password });
    if (user instanceof User === false) {
      throw new Unauthorized('Usuario o contraseña incorrectos');
    }
    return succesResponse(res, 'Autenticación correcta', { userName, token: UserService.createToken(user) });
  } catch (err) {
    next(err);
    return null;
  }
};
