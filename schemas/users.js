import Joi from 'joi';

const email = Joi.string().email();
const first_name = Joi.string();
const last_name = Joi.string();
const password = Joi.string();
const status = Joi.boolean().default(true);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  first_name: first_name.required(),
  last_name: last_name.required(),
});

const updateUserSchema = Joi.object({
  status,
  first_name,
  last_name,
});

const getUserSchema = Joi.object({
  email: email.required(),
});

export { createUserSchema, updateUserSchema, getUserSchema };
