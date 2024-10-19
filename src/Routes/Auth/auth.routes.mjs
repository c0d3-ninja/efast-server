import {getRouter} from '../../Utills/common.utills.mjs';
import {authPaths} from './auth.constants.mjs';
import jwt from 'jsonwebtoken';
import {log} from '../../Utills/log.utils.mjs';
import validator from 'validator';
import UsersDb from '../Users/users.schema.mjs';
import {sendMail} from '../../Utills/mail.utils.mjs';

const magicTokenSecret = process.env.JWT_SECRET_MAGIC_TOKEN;
const jwtSecret = process.env.JWT_SECRET;

const AuthRouter = getRouter();

AuthRouter.post(authPaths.GENERATE_MAGIC_LINK,async (req,res) => {
  try{
    const {email=''} = req.body;
    if(validator.isEmail(email)){
      const magicToken = jwt.sign({email},magicTokenSecret,{expiresIn:'1d'});
      const user = await UsersDb.findOne({
        email,
      });
      if(user){
        await UsersDb.updateOne({
          email,
        },{$set:{magicToken}});

      }else{
        const newUser = new UsersDb({
          email,
          magicToken,
        });
        await  newUser.save();
      }
      const link = process.env.DOMAIN+`/auth/magic-link?token=${magicToken}`;
      await sendMail({
        from:'postmaster@flashsto.re',
        fromPassword:'test1234',
        to:email,
        subject:'embedfa.st Here is your magic link',
        content:`<div>Click below link to login. This link will expire in 15 mins<br/>
                    <a href="${link}">${link}</a>
                    </div>`,
      });
      // const magicLink = `http://localhost:3000/auth/magic-link?token=${token}`;
      // console.log(magicLink);
      return res.json({message:'Magic link sent to your email.',magicToken});
    }
    res.status(400).json({message:'Invalid email'});
  }catch (e){
    res.status(500).json({message:'Internal server error'});
  }
});

AuthRouter.post(authPaths.LOGIN,async (req,res) => {
  try{
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
      return res.json({message:'Token verified',decoded,jwtToken,userObject});
    }
    return res.status(400).json({message:'Invalid token'});
  }catch (e){
    if(e?.name === 'TokenExpiredError'){
      return res.status(400).json({message:'Magic link expired'});
    }
    log(e.message);
    return res.status(500).json({message:'Internal server error'});
  }
});



export default AuthRouter;
