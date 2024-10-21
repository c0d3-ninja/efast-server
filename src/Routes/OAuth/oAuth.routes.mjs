import {getRouter} from '../../Utills/common.utills.mjs';
import {verifyGoogleToken} from '../../Utills/login.utils.mjs';
import {generateMagicTokenAndSave} from '../Auth/auth.dbUtils.mjs';


const OAuthRouter = getRouter();

OAuthRouter.get('/callback',async (req,res) => {
  const invalidTokenUrl = '/auth?message=Invalid_token';
  try {
    const {code} = req.query;
    if(!code){
      return res.redirect(invalidTokenUrl);
    }
    const {email} = await verifyGoogleToken(code);
    if(email){
      const {magicToken} = await generateMagicTokenAndSave(email);
      return res.redirect(`/googleSignIn/callback?token=${magicToken}`);
    }
    return res.redirect(invalidTokenUrl);
  }catch (e){
    return res.redirect(invalidTokenUrl);
  }
});



export default OAuthRouter;
