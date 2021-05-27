import succesResponse from '../../utils/response';
import generatedDataService from './generated-data.service';
import BadRequest from '../../utils/errors/bad-request';

const validateDataSchema = (dataSchema) => {
  if (!Array.isArray(dataSchema) || dataSchema?.length < 1) {
    throw new BadRequest('DataSchema incorrecto');
  }
  const validDataSchema = dataSchema.filter(({ name, type }) => {
    const validName = typeof name === 'string' && name !== '';
    const validType = type.id && type.name && type.options && type.group;
    return validName && validType;
  });
  if (!Array.isArray(validDataSchema) || validDataSchema?.length < 1) {
    throw new BadRequest('ValidDataSchema incorrecto', validDataSchema);
  }
  return validDataSchema;
};

exports.preview = async (req, res, next) => {
  try {
    const { dataSchema, previewSize } = req.body;
    const previewData = await generatedDataService(
      validateDataSchema(dataSchema),
      previewSize,
    );
    return succesResponse(res, 'Vista previa de objetos generados', { previewData });
  } catch (err) {
    next(err);
    return null;
  }
};
