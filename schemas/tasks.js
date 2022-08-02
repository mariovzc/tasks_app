import Joi from 'joi';

const name = Joi.string().min(3);
const desc = Joi.String();
const assigned = Joi.object();
const status = Joi.String().valid('pending', 'done', 'canceled');
const module = Joi.String();
const end_date = Joi.string().isoDate();

const createTaskSchema = Joi.object({
  name: name.required(),
  end_date: end_date.required(),
  assigned: assigned.required(),
  module: module.required(),
  desc,
});

const updateTaskSchema = Joi.object({
  end_date,
  status
});

export { createTaskSchema, updateTaskSchema };
