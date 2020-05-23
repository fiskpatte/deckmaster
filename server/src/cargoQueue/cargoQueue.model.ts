import * as mongoose from 'mongoose';
import { Cargo } from 'src/cargo/cargo.model';

export const CargoQueueItemSchema = new mongoose.Schema(
  {
    voyageId: String,
    registrationNumber: String,
    cargo: { type: mongoose.Schema.Types.ObjectId, ref: 'Cargo' },
    deckId: String,
  },
  { timestamps: true },
);

export interface CargoQueueItem extends mongoose.Document {
  id: string;
  voyageId: string;
  registrationNumber: string;
  deckId: string;
  createdAt: Date;
  updatedAt: Date;
  cargo: Cargo;
}
