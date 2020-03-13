import { AUTH_SET_JWT_EXPIRATION_DATE } from "./../../shared/constants";
import jwt_decode from "jwt-decode";

export const setJwtExpirationDate = token => {
  const expirationDate = new Date(jwt_decode(token).exp * 1000);
  return {
    type: AUTH_SET_JWT_EXPIRATION_DATE,
    payload: expirationDate
  };
};
