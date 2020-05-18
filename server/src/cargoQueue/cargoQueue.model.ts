import * as mongoose from 'mongoose';

export const CargoQueueItemSchema = new mongoose.Schema({
  voyageId: String,
  registrationNumber: String,
  deckId: String,
}, { timestamps: true });

export interface CargoQueueItem extends mongoose.Document {
  id: string;
  voyageId: string;
  registrationNumber: string;
  deckId: string;
  createdAt: Date;
  updatedAt: Date;
};
