import express from 'express';
import {configureMiddleWares, connectMongo} from './Utills/common.utills.mjs';
import AuthRouter from './Routes/Auth/auth.routes.mjs';
import WidgetsRouter from './Routes/Widgets/widgets.routes.mjs';
import PublicRouter from './Routes/Public/public.routes.mjs';
import {log} from './Utills/log.utils.mjs';

export default function (){
  const port = process.env.PORT;

  console.log('env==>',process.env.JWT_SECRET);

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

}
