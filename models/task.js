import mongoose from 'mongoose';
import DateHelper from '../utils/date_helper.js';

const { model, Schema } = mongoose;

const date_conf = { type: String, default: DateHelper.now_toISOString };

const TaskSchema = new Schema(
  {
    name: String,
    desc: String,
    assigned: {
      type: Map,
      of: String,
    },
    status: { type: String, default: 'pending' },
    module: String,
    end_date: String,
    created_at: date_conf,
    updated_at: date_conf,
    creator: String,
  },
  { versionKey: false }
);

const Task = model('Task', TaskSchema);

export default Task;
