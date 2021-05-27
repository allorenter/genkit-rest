import mongoose from 'mongoose';

const { Schema } = mongoose;

const PersistentDataSchema = new Schema({});

const model = mongoose.model('persistent-data', PersistentDataSchema, 'persistent-data');

export default async (specifiedFieldsParam, sizeParam) => {
  try {
    const size = sizeParam || 10;
    const specifiedFields = Array.isArray(specifiedFieldsParam) ? specifiedFieldsParam : ['calle', 'codpostal'];
    const project = {};
    specifiedFields.forEach((field) => {
      project[field] = 1;
    });
    const data = await model.aggregate([{ $sample: { size } }, { $project: { ...project, _id: 0 } }]);
    return data;
  } catch (err) {
    return err;
  }
};
