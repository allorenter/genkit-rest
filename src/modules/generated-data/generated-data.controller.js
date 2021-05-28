import dayjs from 'dayjs';
import succesResponse from '../../utils/response';
import { preview, generateJSON, generateCSV } from './generated-data.service';
import BadRequest from '../../utils/errors/bad-request';
import GeneratedDataModel from './generated-data.model';

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
    const { dataSchema, size } = req.body;
    const previewData = await preview(
      validateDataSchema(dataSchema),
      size,
    );
    return succesResponse(res, 'Vista previa de objetos generados', { previewData });
  } catch (err) {
    next(err);
    return null;
  }
};

exports.generateJSON = async (req, res, next) => {
  try {
    const { dataSchema } = req.body;
    const size = req.body.size || 10;
    const filename = req.body.filename || 'filename';
    const fileLocation = await generateJSON(
      validateDataSchema(dataSchema), size, filename,
    );
    const log = new GeneratedDataModel({
      date: dayjs().format(),
      user: req.payload.userName,
      filename,
      fileExtension: 'json',
      path: fileLocation,
    });
    log.save();
    return res.download(fileLocation);
  } catch (err) {
    next(err);
    return null;
  }
};

exports.generateCSV = async (req, res, next) => {
  try {
    const { dataSchema } = req.body;
    const size = req.body.size || 10;
    const filename = req.body.filename || 'filename';
    const fileLocation = await generateCSV(
      validateDataSchema(dataSchema), size, filename,
    );
    const log = new GeneratedDataModel({
      date: dayjs().format(),
      user: req.payload.userName,
      filename,
      fileExtension: 'csv',
      path: fileLocation,
    });
    log.save();
    return res.download(fileLocation);
  } catch (err) {
    next(err);
    return null;
  }
};
