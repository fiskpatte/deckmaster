import * as mongoose from 'mongoose';
import { LoadingType } from 'src/utils/enums';

export const CargoPlacementSchema = new mongoose.Schema({
  cargoId: String,
  loadingType: Number,
  deckId: String,
  laneId: String,
  gridId: String,
});

export interface CargoPlacement extends mongoose.Document {
  id: string;
  cargoId: string;
  loadingType: LoadingType;
  deckId: string;
  laneId: string;
  gridId: string;
}

export class CargoPlacementDto {
  cargoId: string;
  loadingType: LoadingType;
  deckId: string;
  laneId: string;
  gridId: string;
}
