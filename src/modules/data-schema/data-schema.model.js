import mongoose from 'mongoose';

const { Schema } = mongoose;

const DataSchemaSchema = new Schema({
  date: Date,
  name: String,
  user: String,
  schema: Array,
});

export default mongoose.model('data-schema', DataSchemaSchema);
