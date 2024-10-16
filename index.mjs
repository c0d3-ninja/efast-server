import  'dotenv/config.js';
import express from 'express';
import {configureMiddleWares, connectMongo} from './src/Utills/common.utills.mjs';
import AuthRouter from './src/Routes/Auth/auth.routes.mjs';
import WidgetsRouter from './src/Routes/Widgets/widgets.routes.mjs';
import PublicRouter from './src/Routes/Public/public.routes.mjs';
import {log} from './src/Utills/log.utils.mjs';

const port = process.env.PORT;

const app = express();
configureMiddleWares(app);
connectMongo();

app.use('/api/v1/auth',AuthRouter);
app.use('/api/v1/widgets',WidgetsRouter);
app.use('/api/v1/public/widget',PublicRouter);

app.use('/',(req,res) => {
  log('default route');
  res.json({});
});

app.listen(port, () => {
  log(`Server is running on port ${port}`);
});

