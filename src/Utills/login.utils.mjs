import { OAuth2Client } from 'google-auth-library';


export async function verifyGoogleToken (code) {
  // console.log('code',code);
  // console.log(process.env.G_LOGIN_CLIENT_ID,process.env.G_LOGIN_CLIENT_SUPERNOVA);
  const client = new OAuth2Client(process.env.G_LOGIN_CLIENT_ID,process.env.G_LOGIN_CLIENT_SUPERNOVA,'http://localhost/oauth2/callback');
  const {tokens} = await client.getToken(code);
  const {id_token} = tokens;
  const ticket = await client.verifyIdToken({
    idToken: id_token,
    audience: process.env.G_LOGIN_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return {email:payload.email};
}
