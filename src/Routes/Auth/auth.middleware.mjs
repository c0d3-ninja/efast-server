import UsersDb from '../Users/users.schema.mjs';
import {authPaths} from './auth.constants.mjs';
import jwt from 'jsonwebtoken';
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
      if(!Bearer){
        throw new Error('Bearer not found');
      }
      const decoded = jwt.verify(Bearer,jwtSecret);
      const {email,_id} = decoded;
      const user = await UsersDb.findOne(
        _id,
        email,
      );
      if(!user){
        throw 'User not found';
      }
      req.currentUser=user.toObject();
      req.currentUser._id=req.currentUser._id.toString();
      req.currentUser.email=email;
      next();
    }
  }catch (e){
    res.clearCookie('Bearer');
    return res.status(401).json({message:'UnAuthorized'});
  }
};
