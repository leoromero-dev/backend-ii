import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
  role: { type: String, default: 'user' },
});

const usersModel = model('Users', userSchema);

export default usersModel;
