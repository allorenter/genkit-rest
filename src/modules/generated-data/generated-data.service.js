import { Parser } from 'json2csv';
import getPersistentData from './persistent-data.repository';
import { generatePropertyValue } from './dynamic-data.service';
import { countDuplicates, randomNumber } from '../../utils/functions';
import { persistentDataFields } from '../../conf';

const generateData = async (dataSchema, size) => {
  // me quedo con los tipos de datos de cada propiedad
  const specifiedFields = dataSchema.map(({ type }) => type?.id);

  // busco datos de las propiedades 'persistentes'
  const persistentData = await getPersistentData(specifiedFields, size);

  // array de datos persistentes adicionales
  let additionalPersistentData = [];
  // compruebo si hay más de 1 propiedad del mismo tipo de dato persistente, en ese caso obtengo persistent-data adicionales,
  const persistentFieldDuplicatesCount = countDuplicates(specifiedFields).filter((field) => field.count > 1);
  if (persistentFieldDuplicatesCount && persistentFieldDuplicatesCount.length > 0) {
    const duplicateFields = persistentFieldDuplicatesCount.map((field) => field.value);
    additionalPersistentData = await getPersistentData(duplicateFields, size * 5);
  }

  // genero un array con el número de objetos especificado
  const generatedData = [];
  for (let i = 0; i < size; i += 1) {
    // objeto con los datos generados
    const generatedObject = {};
    /* sirve para saber que ya se ha generado una propiedad de un tipo de dato persitente concreto,
        las demás propiedades de ese tipo que se van a generar en el objeto lo harán con additionalPersistentData
    */
    const mainPropertyComplete = {};
    // genero key => value por cada propiedad de dataSchema
    dataSchema.forEach((property) => {
      // persistent data
      if (persistentDataFields.includes(property.type.id)) {
        if (!mainPropertyComplete[property.type.id]) {
          generatedObject[property.name] = persistentData[i][property.type.id];
          mainPropertyComplete[property.type.id] = true;
        } else {
          generatedObject[property.name] = additionalPersistentData[randomNumber(0, size * 5)][property.type.id];
        }
      }
      // dynamic data
      if (!persistentDataFields.includes(property.type.id)) {
        generatedObject[property.name] = generatePropertyValue(property.type.id);
      }
    });

    generatedData.push(generatedObject);
  }

  return generatedData;
};

export const preview = async (dataSchema, size) => generateData(dataSchema, size);

export const generateJSON = async (dataSchema, size) => {
  const generatedJSONData = JSON.stringify(await generateData(dataSchema, size));
  return generatedJSONData;
};

export const generateCSV = async (dataSchema, size) => {
  const parser = new Parser();
  const generatedCSVdata = parser.parse(await generateData(dataSchema, size));
  return generatedCSVdata;
};
