import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      // Token is expired
      return true;
    }
    return false;
  } catch (err) {
    // Token is not valid
    return true;
  }
};

export default isTokenExpired;
