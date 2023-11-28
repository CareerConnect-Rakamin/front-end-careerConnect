import { jwtDecode } from 'jwt-decode';

export function validateToken() {
  const tokenName = 'token';
  const token = localStorage.getItem(tokenName);

  if (token) {
    try {
      const decodedAccessToken = jwtDecode(token);

      if (decodedAccessToken.id && isTokenExpired(decodedAccessToken)) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
}

function isTokenExpired(token) {
  const currentTime = Math.floor(Date.now() / 1000);
  return token.exp < currentTime;
}
