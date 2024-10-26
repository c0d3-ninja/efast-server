import mongoose from 'mongoose';
import {v4 as uuidV4} from 'uuid';

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidV4, // Generate a random UUID
  },
  email: { type: String, required: true, unique: true },
  magicToken: { type: String },
},{ versionKey: false,timestamps:true });

const UsersDb = mongoose.model('users', userSchema);

export default UsersDb;
