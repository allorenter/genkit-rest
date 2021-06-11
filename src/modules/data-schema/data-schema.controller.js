import { saveDataSchema } from './data-schema.service';
import succesResponse from '../../utils/response';
import BadRequest from '../../utils/errors/bad-request';

exports.saveDataSchema = async (req, res, next) => {
  try {
    const { dataSchema, name } = req.body;
    if (!name) {
      throw new BadRequest();
    }
    const result = await saveDataSchema(dataSchema, name, req.payload.username);
    return succesResponse(res, 'Data schema guardado', result);
  } catch (err) {
    next(err);
    return null;
  }
};
