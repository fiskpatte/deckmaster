import { post, get, put } from "./verbs";

export const getCargoPlacements = async () =>
  await get(`cargoPlacement/voyage`);

export const placeCargo = async (cargoPlacement: any) => {
  console.log("cargoPlameent: ", cargoPlacement);
  await post("cargoplacement", cargoPlacement);
};

export const updateCargoPlacement = async (cargoPlacement: any) => {
  console.log("cargoPlameent: ", cargoPlacement);
  await put("cargoplacement", cargoPlacement);
};
