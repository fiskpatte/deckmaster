import * as mongoose from 'mongoose';
import { Cargo } from 'src/cargo/cargo.model';

export const CargoPlacementSchema = new mongoose.Schema(
  {
    registrationNumber: String,
    deckId: String,
    laneId: String,
    LCG: Number,
    TCG: Number,
    VCG: Number,
    overflowingLaneId: String,
    voyageId: String,
    cargo: { type: mongoose.Schema.Types.ObjectId, ref: 'Cargo' },
    discharged: Boolean,
  },
  { timestamps: true },
);

export interface CargoPlacement extends mongoose.Document {
  id: string;
  registrationNumber: string;
  deckId: String;
  laneId: String;
  LCG: Number;
  TCG: Number;
  VCG: Number;
  overflowingLaneId: String;
  createdAt: Date;
  updatedAt: Date;
  voyageId: String;
  cargo: Cargo;
  discharged: boolean;
}
