import succesResponse from '../../utils/response';
import User from './user.model';
import BadRequest from '../../utils/errors/bad-request';
import AlreadyExists from '../../utils/errors/already-exists';

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
    const userExists = await User.countDocuments({ userName }) > 0;
    if (userExists) {
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
