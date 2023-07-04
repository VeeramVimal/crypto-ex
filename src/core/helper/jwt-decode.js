import jwt_decode from 'jwt-decode';
import { getCookie } from './cookie';

export const decodeJWT = (TOKEN) => {
  try {
    const token = (TOKEN) ? TOKEN : getCookie("userToken");
    const decodedToken = jwt_decode(token, { header: true });// returns algorithm
    // JWT exp is in seconds
    let result;
    if (decodedToken.typ === 'JWT') { 
      result = true;
    } else {
      result = false;
    }
    return result;
  } catch (e) {
    console.log('JWT error', e.message)
  }
}