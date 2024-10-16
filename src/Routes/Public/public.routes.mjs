import {getRouter} from '../../Utills/common.utills.mjs';
import WidgetsDb from '../Widgets/widgets.schema.mjs';

const PublicRouter = getRouter();

PublicRouter.get('/details',async (req,res) => {
  try{
    const {_id}=req.query;
    if(!_id?.trim().length){
      return res.status(400).json({
        message:'Invalid widget id',
      });
    }
    const widgetDbObject = await WidgetsDb.findOne({
      _id,
    });
    if(!widgetDbObject){
      return res.json({
        message:'Widget not found',
      });
    }
    const widgetObj = widgetDbObject.toObject();
    res.json({
      message:'success',
      data: {...widgetObj,moduleUrl:'http://localhost/cookiecat/widget/dist/index.js'},
    });
  }catch (e){
    res.status(500).json({});
  }
});


export default PublicRouter;
