import { bool, object, string } from 'joi';

const id = string();
const name = string();
const done = bool();
const end_date = string().isoDate();

const createTaskSchema = object({
  name: name.required(),
  end_date: end_date.required(),
});

const updateTaskSchema = object({
  done,
  end_date,
});

const getTaskSchema = object({
  id: id.required(),
});

export { createTaskSchema, updateTaskSchema, getTaskSchema };
