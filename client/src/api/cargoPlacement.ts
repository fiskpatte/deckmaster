import { post, get } from "./verbs";

export const getCargoPlacements = async () =>
  await get(`cargoPlacement/voyage`);

export const placeCargo = async (cargoPlacement: any) =>
  await post("cargoplacement", cargoPlacement);
