import * as mongoose from 'mongoose';

export const CargoPlacementSchema = new mongoose.Schema({
  registrationNumber: String,
  deckId: String,
  laneId: String,
  LCG: Number,
  TCG: Number,
  VCG: Number,
  overflowingLaneId: String,
});

export interface CargoPlacement extends mongoose.Document {
  id: string;
  registrationNumber: string;
  deckId: String;
  laneId: String;
  LCG: Number;
  TCG: Number;
  VCG: Number;
  overflowingLaneId: String;
}

export class CargoPlacementDto {
  registrationNumber: string;
  deckId: String;
  laneId: String;
  LCG: Number;
  TCG: Number;
  VCG: Number;
  overflowingLaneId: String;
}
