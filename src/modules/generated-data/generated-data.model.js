import mongoose from 'mongoose';

const { Schema } = mongoose;

const GeneratedDataSchema = new Schema({
  date: Date,
  user: String,
  filename: String,
  fileExtension: String,
});

export default mongoose.model('generated-data', GeneratedDataSchema);
