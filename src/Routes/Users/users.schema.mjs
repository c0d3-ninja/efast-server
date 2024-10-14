import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  magicToken: { type: String },
},{ versionKey: false,timestamps:true });

const UsersDb = mongoose.model('users', userSchema);

export default UsersDb;
