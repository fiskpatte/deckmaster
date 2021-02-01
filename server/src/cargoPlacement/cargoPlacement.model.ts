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
    discharged: { type: Boolean, default: false },
    replacing: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export interface CargoPlacement extends mongoose.Document {
  id: string;
  registrationNumber: string;
  deckId: string;
  laneId: string;
  LCG: number;
  TCG: number;
  VCG: number;
  overflowingLaneId: string;
  createdAt: Date;
  updatedAt: Date;
  voyageId: string;
  cargo: Cargo;
  discharged: boolean;
  replacing: boolean;
}

export interface SuggestedCargoPlacement {
  deckId: string;
  laneId: string;
  LCG: number;
  TCG: number;
}
