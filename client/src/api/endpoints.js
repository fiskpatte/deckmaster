import { setAuthorizationToken } from "../functions/axios";
import { post } from "./verbs";

export const login = async (username, password) => {
  const result = await post("auth/login", {
    username,
    password,
  });

  if (result?.access_token) {
    setAuthorizationToken(result.access_token);
  } else {
    throw new Error("Login failed");
  }
};

export const getMockCargo = async () => {
  const result = await post("cargo/mock");
  if (result) {
    return result;
  } else {
    throw new Error("Failed to get mock cargo");
  }
};
