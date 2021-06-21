import dayjs from 'dayjs';
import succesResponse from '../../utils/response';
import { preview, generateJSON, generateCSV } from './generated-data.service';
import GeneratedDataModel from './generated-data.model';
import { validateDataSchema } from '../data-schema/data-schema.service';

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
    const fileContent = await generateJSON(validateDataSchema(dataSchema), size);

    const log = new GeneratedDataModel({
      date: dayjs().format(),
      user: req?.payload?.userName || '',
      filename,
      fileExtension: 'json',
    });
    log.save();

    res.setHeader('Content-disposition', `attachment; filename="${filename}.json"`);
    res.setHeader('Content-type', 'text/json; charset=UTF-8');
    return res.status(200).send(fileContent);
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
    const fileContent = await generateCSV(validateDataSchema(dataSchema), size);

    const log = new GeneratedDataModel({
      date: dayjs().format(),
      user: req?.payload?.userName || '',
      filename,
      fileExtension: 'csv',
    });
    log.save();

    res.setHeader('Content-disposition', `attachment; filename="${filename}.csv"`);
    res.setHeader('Content-type', 'text/csv; charset=UTF-8');
    return res.status(200).send(fileContent);
  } catch (err) {
    next(err);
    return null;
  }
};
