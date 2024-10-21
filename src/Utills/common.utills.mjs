import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {authMiddleware} from '../Routes/Auth/auth.middleware.mjs';
import {envKeys, getEnvValue} from './env.utils.mjs';

export const getRouter = () => {
  return express.Router();
};

export const configureMiddleWares = (app) => {
  app.use(cors({ origin: '*' }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(authMiddleware);
  app.use(bodyParser.json());
};

export const connectMongo = () => {
  const uri = `mongodb://127.0.0.1:27017/${getEnvValue(envKeys.MONGO_DB_NAME)}?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.15`;
  mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));
};
