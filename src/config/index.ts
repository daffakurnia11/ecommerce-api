import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const envSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().allow(''),
  DB_NAME: Joi.string().required(),
  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().required(),
  API_PORT: Joi.number().required(),
}).unknown(); 

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Environment validation error: ${error.message}`);
}

export const config = {
  db: {
    host: envVars.DB_HOST,
    user: envVars.DB_USER,
    password: envVars.DB_PASS,
    database: envVars.DB_NAME,
  },
  jwt: {
    secret: envVars.JWT_ACCESS_SECRET,
    refreshSecret: envVars.JWT_REFRESH_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN,
    refreshExpiresIn: envVars.JWT_REFRESH_EXPIRES_IN,
  },
  port: envVars.API_PORT,
};
