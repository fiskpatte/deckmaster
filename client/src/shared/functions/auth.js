import jwt_decode from "jwt-decode";

export const isLoggedIn = () => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    return false;
  }

  const expirationDate = new Date(jwt_decode(token).exp * 1000);
  return new Date() < expirationDate;
};
