import {getRouter} from '../../Utills/common.utills.mjs';
import {authPaths} from './auth.constants.mjs';
import jwt from 'jsonwebtoken';
import {log} from '../../Utills/log.utils.mjs';
import validator from 'validator';
import UsersDb from '../Users/users.schema.mjs';
import {sendMail} from '../../Utills/mail.utils.mjs';
import {verifyGoogleToken} from '../../Utills/login.utils.mjs';
import {generateMagicTokenAndSave} from './auth.dbUtils.mjs';
import {envKeys, getEnvValue, isProductionEnvironment} from '../../Utills/env.utils.mjs';


const AuthRouter = getRouter();

const login = async (req,res) => {
  try{
    const magicTokenSecret = getEnvValue(envKeys.JWT_SECRET_MAGIC_TOKEN);
    const jwtSecret =getEnvValue(envKeys.JWT_SECRET);
    const {magicToken} = req.body;
    if(magicToken?.trim().length>0){
      const decoded = jwt.decode(magicToken,magicTokenSecret);
      const {email} = decoded||{};
      const user = await UsersDb.findOne({
        email,
        magicToken,
      });
      if(!user){
        return res.status(400).json({message:'Invalid magic link'});
      }
      const userObject = user.toObject();
      const jwtToken = jwt.sign({email,userId:userObject._id.toString()},jwtSecret,{expiresIn:'30d'});
      res.cookie('Bearer',jwtToken,{
        path:'/',
        httpOnly: true,
      });
      await UsersDb.updateOne({
        email,
      },{$unset:{magicToken:''}});
      return res.json({message:'Token verified',
        jwtToken,
        data:{email,userId:userObject._id.toString()}});
    }
    return res.status(400).json({message:'Invalid token'});
  }catch (e){
    if(e?.name === 'TokenExpiredError'){
      return res.status(400).json({message:'Magic link expired'});
    }
    log(e.message);
    return res.status(500).json({message:'Internal server error'});
  }
};

AuthRouter.post(authPaths.GENERATE_MAGIC_LINK,async (req,res) => {
  try{
    const {email=''} = req.body;
    if(validator.isEmail(email)){
      const {magicToken} = await generateMagicTokenAndSave(email);
      const link = getEnvValue(envKeys.DOMAIN)+`/auth/login/callback?token=${magicToken}`;
      if(isProductionEnvironment()){
        await sendMail({
          from:'postmaster@flashsto.re',
          fromPassword:'test1234',
          to:email,
          subject:'embedfa.st Here is your magic link',
          content:`<div>Click below link to login. This link will expire in 15 mins<br/>
                    <a href="${link}">${link}</a>
                    </div>`,
        });
        return res.json({message:'Magic link sent to your email.',magicToken});
      }else{
        req.body={magicToken};
        return await login(req,res);
      }
    }
    return res.status(400).json({message:'Invalid email'});
  }catch (e){
    return res.status(500).json({message:'Internal server error'});
  }
});

AuthRouter.post(authPaths.LOGIN,login);
AuthRouter.post(authPaths.GOOGLE_LOGIN,async (req,res) => {
  try{
    const {code} = req.body;
    const jwtSecret =getEnvValue(envKeys.JWT_SECRET);
    if(code?.trim().length>0){
      const {email} = await verifyGoogleToken(code);
      if(!email){
        return res.status(400).json({message:'Invalid token'});
      }
      const user = await UsersDb.findOne({
        email,
      });
      let userObject;
      if(!user){
        const newUser = new UsersDb({
          email,
        });
        await  newUser.save();
        userObject=newUser.toObject();
      }else{
        userObject = user.toObject();
      }
      const jwtToken = jwt.sign({email,userId:userObject._id.toString()},jwtSecret,{expiresIn:'30d'});
      res.cookie('Bearer',jwtToken,{
        path:'/',
        httpOnly: true,
      });
      return res.json({message:'Token verified', data:{email,userId:userObject._id.toString()}});
    }
    return res.status(400).json({message:'Invalid token'});
  }catch (e){
    if(e?.name === 'TokenExpiredError'){
      return res.status(400).json({message:'Magic link expired'});
    }
    log(e);
    return res.status(500).json({message:'Internal server error'});
  }
});



export default AuthRouter;
