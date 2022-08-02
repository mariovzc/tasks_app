import mongoose from 'mongoose';
import DateHelper from '../utils/date_helper.js';

const { model, Schema } = mongoose;

const date_conf = { type: String, default: DateHelper.now_toISOString };

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: String,
  last_name: String,
  password: String,
  status: Boolean,
  created_at: date_conf,
  updated_at: date_conf,
});

const User = model('User', UserSchema);

export default User;
