import UsersDb from '../Users/users.schema.mjs';
import {authPaths} from './auth.constants.mjs';
import jwt from 'jsonwebtoken';
import {log} from '../../Utills/log.utils.mjs';

const jwtSecret = process.env.JWT_SECRET;

export  const authMiddleware =  async (req,res,next) => {
  try{
    const unAuthPaths= [
      `/api/v1/auth${authPaths.GENERATE_MAGIC_LINK}`,
      `/api/v1/auth${authPaths.LOGIN}`,
      '/api/v1/public/widget/details',
      '/api/v1/public/widget/sendmail',
    ];
    if(unAuthPaths.includes(req.path)){
      next();
    }else{
      const {Bearer} =req.cookies;
      const decoded = jwt.verify(Bearer,jwtSecret);
      log(decoded);
      const {email,_id} = decoded;
      const user = await UsersDb.findOne(
        _id,
        email,
      );
      if(!user){
        res.clearCookie('Bearer');
        return res.status(401).json({message:'UnAuthorized'});
      }
      req.currentUser=user.toObject();
      req.currentUser._id=user._id.toString();
      req.currentUser.email=email;
      next();
    }
  }catch (e){
    res.clearCookie('Bearer');
    return res.status(401).json({message:'UnAuthorized'});
  }
};
