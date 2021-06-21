import dayjs from 'dayjs';
import DataSchemaModel from './data-schema.model';
import BadRequest from '../../utils/errors/bad-request';

export const validateDataSchema = (dataSchema) => {
  if (!Array.isArray(dataSchema) || dataSchema?.length < 1) {
    throw new BadRequest('DataSchema incorrecto');
  }
  const validDataSchema = dataSchema.filter(({ name, options, type }) => {
    const validName = typeof name === 'string' && name !== '';
    const validType = type.id && type.name && type.defaultOptions && type.group;
    const validOptions = typeof options === 'object';
    return validName && validType && validOptions;
  });
  if (!Array.isArray(validDataSchema) || validDataSchema?.length < 1) {
    throw new BadRequest('DataSchema inválido', validDataSchema);
  }
  return validDataSchema;
};

export const saveDataSchema = async (dataSchema, name, user) => {
  // hay que comprobar que el nombre del schema no exista en ese usuario
  const newDataSchema = new DataSchemaModel({
    schema: validateDataSchema(dataSchema),
    name,
    user,
    date: dayjs().format(),
  });
  await newDataSchema.save();
  return newDataSchema;
};
