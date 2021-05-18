import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  userName: String,
  password: String,
});

UserSchema.index({
  userName: 1,
}, { unique: true });

export default mongoose.model('users', UserSchema);
