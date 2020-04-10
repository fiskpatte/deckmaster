import jwt_decode from "jwt-decode";

export const isLoggedIn = () => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    return false;
  }
  const decoded: any = jwt_decode(token);
  const expirationDate = new Date(decoded.exp * 1000);
  return new Date() < expirationDate;
};
