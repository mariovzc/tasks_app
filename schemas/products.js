import Joi from 'joi';

const name = Joi.string().min(3);
const done = Joi.boolean();
const end_date = Joi.string().isoDate();

const createTaskSchema = Joi.object({
  name: name.required(),
  end_date: end_date.required(),
});

const updateTaskSchema = Joi.object({
  done,
  end_date,
});


export { createTaskSchema, updateTaskSchema };
