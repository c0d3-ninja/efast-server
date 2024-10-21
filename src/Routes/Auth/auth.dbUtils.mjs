import jwt from 'jsonwebtoken';
import UsersDb from '../Users/users.schema.mjs';
import {envKeys, getEnvValue} from '../../Utills/env.utils.mjs';

const magicTokenSecret = getEnvValue(envKeys.JWT_SECRET_MAGIC_TOKEN);
export const generateMagicTokenAndSave = async (email) => {
  const magicToken = jwt.sign({email},magicTokenSecret,{expiresIn:'1d'});
  const user = await UsersDb.findOne({
    email,
  });
  if(user){
    await UsersDb.updateOne({
      email,
    },{$set:{magicToken}});
    return {magicToken,user:user.toObject()};
  }else{
    const newUser = new UsersDb({
      email,
      magicToken,
    });
    await  newUser.save();
    return {magicToken,user:newUser.toObject()};
  }
};
