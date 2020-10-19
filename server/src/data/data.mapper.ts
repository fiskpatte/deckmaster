import { ROUND_TO_DECIMAL_POINT } from "src/utils/constants";
import { Round } from "src/utils/math";
import { CargoPlacement } from "../cargoPlacement/cargoPlacement.model";
import { CargoData } from "./data.model";

export const MapCargoPlacementsToData = (cargoPlacements: CargoPlacement[]): CargoData[] => {
  return cargoPlacements.map(cp => {
    return {
      cargoId: cp.cargo.registrationNumber,
      deckId: cp.deckId,
      LCG: Round(cp.LCG, ROUND_TO_DECIMAL_POINT),
      TCG: Round(cp.TCG, ROUND_TO_DECIMAL_POINT),
      VCG: Round(cp.VCG, ROUND_TO_DECIMAL_POINT),
      length: cp.cargo.length,
      height: cp.cargo.height,
      weight: cp.cargo.weight,
    }
  });
}