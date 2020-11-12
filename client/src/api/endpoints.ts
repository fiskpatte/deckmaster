import { post, get, put } from "./verbs";
import { Settings } from "../types/settings";
import { setAllDefaultHeaders } from "./../functions/axios";
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
    const sessionData = {
      username: result.user_name,
      accessToken: result.access_token,
      voyageId: result.voyage_id,
      vesselId: result.vessel_id,
    } as SessionData;
    setAllDefaultHeaders(sessionData);
    callback(sessionData);
  } else {
    throw new Error("Invalid credentials");
  }
};

export const getMockCargo = async (registrationNumber: string) => {
  const cargo = await post("cargo/mock", { registrationNumber });
  if (!cargo) throw new Error("Failed to get mock cargo");

  return cargo;
};

export const getSettings = async () => {
  const settings = await get(`settings`);
  if (!settings) throw new Error("Failed to get settings");

  return settings;
};

export const updateSettings = async (settings: Settings) => {
  await put("settings", settings);
};

export const placeCargo = async (cargoPlacement: any) => {
  await post("cargoplacement", cargoPlacement);
};
