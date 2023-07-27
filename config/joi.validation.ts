import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().default('root'),
  DB_PASSWORD: Joi.string().default('nodepassword'),
  DEFAULT_LIMIT: Joi.number().default(10),
});
