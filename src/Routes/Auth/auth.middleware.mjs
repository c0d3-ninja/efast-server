import UsersDb from '../Users/users.schema.mjs';
import {authPaths} from './auth.constants.mjs';
import jwt from 'jsonwebtoken';
import {log} from '../../Utills/log.utils.mjs';
import {envKeys, getEnvValue} from '../../Utills/env.utils.mjs';

export  const authMiddleware =  async (req,res,next) => {
  try{
    const jwtSecret = getEnvValue(envKeys.JWT_SECRET);
    const unAuthPaths= [
      `/api/v1/auth${authPaths.GENERATE_MAGIC_LINK}`,
      `/api/v1/auth${authPaths.LOGIN}`,
      `/api/v1/auth${authPaths.GOOGLE_LOGIN}`,
      '/api/v1/public/widget/details',
      '/api/v1/public/widget/sendmail',
      '/oauth2/callback',
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
