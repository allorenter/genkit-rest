import mongoose from 'mongoose';

const { Schema } = mongoose;

const PersistentDataSchema = new Schema({});

const model = mongoose.model('persistent-data', PersistentDataSchema, 'persistent-data');

export default async () => {
  try {
    const data = await model.aggregate([{ $sample: { size: 10 } }]);
    return data;
  } catch (err) {
    return err;
  }
};
