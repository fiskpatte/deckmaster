import { post, get } from "./verbs";

export const getCargoPlacements = async () => {
  const cargoPlacements = await get(`cargoPlacement/voyage`);
  return cargoPlacements;
};

export const placeCargo = async (cargoPlacement: any) =>
  await post("cargoplacement", cargoPlacement);
