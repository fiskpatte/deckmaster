import { post, get, put } from "./verbs";

export const getCargoPlacements = async () =>
  await get(`cargoPlacement/voyage`);

export const placeCargo = async (cargoPlacement: any) => {
  await post("cargoplacement", cargoPlacement);
};

export const updateCargoPlacement = async (cargoPlacement: any) => {
  await put("cargoplacement", cargoPlacement);
};
