import jwt_decode from "jwt-decode";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

export const useIsLoggedIn = () => {
  const { sessionData } = useSelector((state: RootState) => state.appReducer);
  // const token = localStorage.getItem("jwtToken");
  if (!sessionData) return false;

  const { accessToken } = sessionData;

  if (!accessToken) return false;

  return tokenIsValid(jwt_decode(accessToken));
};

const tokenIsValid = (decoded: any) =>
  new Date() < new Date(decoded.exp * 1000);
