import { Schema } from 'mongoose';
import DateHelper from '../utils/date_helper';

const date_conf = { type: String, default: DateHelper.now_toISOString };

const Task = new Schema({
  name: String,
  desc: String,
  assigned: {
    type: Map,
    of: String
  },
  comments: [{ body: String, date: date_conf }],
  status: String,
  module: String,
  private: { type: Boolean, default: false },
  end_date: String,
  created_at: date_conf,
  updated_at: date_conf,
});

export default Task;
