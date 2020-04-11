import { setAuthorizationToken } from "../functions/axios";
import { post, get, put } from "./verbs";
import { Settings } from "../types/settings";

export const login = async (username: string, password: string) => {
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
  const cargo = await post("cargo/mock");
  if (!cargo) throw new Error("Failed to get mock cargo");

  return cargo;
};

export const getSettings = async (vesselId: string) => {
  const settings = await get(`settings/${vesselId}`);
  if (!settings) throw new Error("Failed to get settings");

  return settings;
};

export const updateSettings = async (settings: Settings) => {
  await put("settings", settings);
};
