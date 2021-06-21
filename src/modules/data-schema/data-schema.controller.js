import { saveDataSchema } from './data-schema.service';
import succesResponse from '../../utils/response';
import BadRequest from '../../utils/errors/bad-request';
import AlreadyExists from '../../utils/errors/already-exists';
import DataSchemaModel from './data-schema.model';

exports.saveDataSchema = async (req, res, next) => {
  try {
    const { dataSchema, name } = req.body;
    if (!name) {
      throw new BadRequest('name es requerido');
    }
    if(await DataSchemaModel.countDocuments({ name, user: req.payload.username }) > 0){
      throw new AlreadyExists('Ya existe un DataSchema con ese nombre');
    }
    const result = await saveDataSchema(dataSchema, name, req.payload.username);
    return succesResponse(res, 'Data schema guardado', result);
  } catch (err) {
    next(err);
    return null;
  }
};

exports.getDataSchemas = async (req, res, next) => {
  try {
    const user = req.payload.username;
    const dataSchemas = await DataSchemaModel.find({ user });
    return succesResponse(res, 'DataSchemas del usuario', { dataSchemas, user });
  } catch (err) {
    next(err);
    return null;
  }
}