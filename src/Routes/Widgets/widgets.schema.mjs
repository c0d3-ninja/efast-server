import mongoose from 'mongoose';

const widgetsSchema = new mongoose.Schema({
  type: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  config:{ type: mongoose.Schema.Types.Mixed,
    required: true},
  createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true},
},{ versionKey: false,timestamps:true });

const WidgetsDb = mongoose.model('widgets', widgetsSchema);

export default WidgetsDb;
