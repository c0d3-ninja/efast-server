import {OAuth2Client} from 'google-auth-library';
import {envKeys, getEnvValue} from './env.utils.mjs';


export async function verifyGoogleToken (code) {
  const client = new OAuth2Client(getEnvValue(envKeys.G_LOGIN_CLIENT_ID),getEnvValue(envKeys.G_LOGIN_CLIENT_SECRET),'http://localhost/oauth2/callback');
  const {tokens} = await client.getToken(code);
  const {id_token} = tokens;
  const ticket = await client.verifyIdToken({
    idToken: id_token,
    audience: getEnvValue(envKeys.G_LOGIN_CLIENT_ID),
  });
  const payload = ticket.getPayload();
  return {email:payload.email};
}
