import { post, get, put } from "./verbs";
import { Settings } from "../types/settings";
import { setDefaultHeader } from "./../functions/axios";
import { SessionData } from "./../types/sessionData";

export const login = async (
  username: string,
  password: string,
  callback: (data: SessionData) => void
) => {
  const result = await post("auth/login", {
    username,
    password,
  });

  if (result?.access_token) {
    const data = {
      username: result.user_name,
      accessToken: result.access_token,
      voyageId: result.voyage_id,
    };
    setDefaultHeader("Authorization", `Bearer ${result.access_token}`);
    setDefaultHeader("username", result.user_name);
    setDefaultHeader("voyageId", result.voyage_id);
    callback(data);
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

export const placeCargo = async (cargoPlacement: any) => {
  await post("cargoplacement", cargoPlacement);
};
