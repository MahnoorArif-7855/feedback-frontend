import { jwtDecode } from 'jwt-decode';

export const isJwtValid = (jwt) => {
  const decoded = jwtDecode(jwt);
  const date = Date.now();

  if (date >= decoded.exp * 1000) {
    return {
      valid: false,
      user_id: decoded.user_id,
    };
  } else {
    return {
      valid: true,
      user_id: decoded.user_id,
    };
  }
};
