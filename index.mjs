import express from 'express';
import 'dotenv/config.js';
import AuthRouter from './src/Routes/Auth/auth.routes.mjs';
import {log} from './src/Utills/log.utils.mjs';
import {configureMiddleWares, connectMongo} from './src/Utills/common.utills.mjs';

const port = process.env.PORT;

const app = express();
configureMiddleWares(app);
connectMongo();



app.use('/api/v1/auth',AuthRouter);

app.use('/',(req,res) => {
  log('default route');
  res.json({});
});


app.listen(port, () => {
  log(`Server is running on port ${port}`);
});
