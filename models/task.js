import { model, Schema } from 'mongoose';
import DateHelper from '../utils/date_helper';

const date_conf = { type: String, default: DateHelper.now_toISOString };

const TaskSchema = new Schema({
  name: String,
  desc: String,
  assigned: {
    type: Map,
    of: String
  },
  status: String,
  module: String,
  end_date: String,
  created_at: date_conf,
  updated_at: date_conf,
});

const Task = model("Task", TaskSchema)

export default Task;
