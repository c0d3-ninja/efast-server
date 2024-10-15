import {getRouter} from '../../Utills/common.utills.mjs';
import WidgetsDb from './widgets.schema.mjs';

const WidgetsRouter = getRouter();


WidgetsRouter.post('/create',async (req,res) => {
  try{
    const {_id:createdBy} = req.currentUser;
    const {name='',config,type} = req.body;
    const widget = new WidgetsDb({
      name,
      type,
      createdBy,
      config,
    });
    const widgetDbObj = await widget.save();
    const widgetObj = widgetDbObj.toObject();
    res.status(200).json({
      message:'Widget created successfully',
      data:widgetObj,
    });
  }catch (e){
    res.status(500).json({});
  }
});

WidgetsRouter.patch('/edit',async (req,res) => {
  try{
    const {_id:createdBy} = req.currentUser;
    const {name,config,_id}=req.body;
    await WidgetsDb.updateOne(
      {
        _id,
        createdBy,
      },
      {
        $set:{
          name,
          config,
        },
      },
    );
    const widgetDbObj = await WidgetsDb.findOne({_id,createdBy});
    if(!widgetDbObj){
      return res.status(400).json({message:'Widget not found'});
    }
    const widgetObj=widgetDbObj.toObject();
    res.status(200).json({
      message:'Widget saved successfully',
      data:widgetObj,
    });
  }catch (e){
    res.status(500).json({});
  }
});

WidgetsRouter.get('/details',async (req,res) => {
  try{
    res.json({});
  }catch (e){
    res.status(500).json({});
  }
});


export default WidgetsRouter;
