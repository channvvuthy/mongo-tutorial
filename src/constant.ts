require('dotenv').config();

export const APP_PORT = process.env.APP_PORT || 3000;
export const DB_HOST = process.env.DB_HOST;
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_TYPE = process.env.DB_TYPE;
export const DB_PORT = Number(process.env.DB_PORT || 5432);
export const JWT_SECRET = process.env.JWT_SECRET;
