import axios from "axios";
import { setAuthorizationToken } from "../shared/functions/axios";

const serverPrefix = "http://localhost:4000/";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const login = async (username, password) => {
  try {
    const result = await axios.post(`${serverPrefix}auth/login`, {
      username,
      password
    });
    if (result?.data?.access_token) {
      const token = result.data.access_token;
      localStorage.setItem("jwtToken", token);
      setAuthorizationToken(token);
      //setJwtExpirationDate(token);

      return token;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};
