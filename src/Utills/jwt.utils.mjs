export const isJwtExpired = (decodedToken={}) => {
  if(!decodedToken.exp) {
    return true;
  }
  const currentTime = Date.now();
  const expiryTime = decodedToken.exp*1000;
  return currentTime>expiryTime;
};
