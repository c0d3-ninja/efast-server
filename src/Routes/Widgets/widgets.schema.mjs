import {v4 as uuidV4} from 'uuid';
import mongoose from 'mongoose';
import maxLengthConstants from '../../Constants/maxLength.constants.mjs';

const qaSchema = new mongoose.Schema({
  question:{
    type: String,
    maxlength: maxLengthConstants.QUESTION,
    default:'',
  },
  answer:{
    type:String,
    maxlength:maxLengthConstants.ANSWER,
    default:'',
  },
},{ versionKey: false,_id: false });

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength:maxLengthConstants.CATEGORY_NAME,
    default:'',
  },
  qa: {
    type: [qaSchema],
    default:[],
  },

},{ versionKey: false,_id: false});

const widgetConfigSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: maxLengthConstants.WIDGET_TITLE,
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
  showCategories:{
    type: Boolean,
    default: true,
  },
  categories: [categorySchema],
},{ versionKey: false,_id: false});

const widgetsSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidV4,
  },
  name: { type: String, required: true, maxlength:maxLengthConstants.WIDGET_NAME },
  config:{ type: widgetConfigSchema,
    required: true},
  createdBy:{type:String,ref:'users',required:true},
},{ versionKey: false,timestamps:true });

const WidgetsDb = mongoose.model('widgets', widgetsSchema);

export default WidgetsDb;
