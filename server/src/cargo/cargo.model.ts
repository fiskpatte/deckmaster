import * as mongoose from 'mongoose';
import { CargoType } from 'src/utils/enums';

export const CargoSchema = new mongoose.Schema(
  {
    registrationNumber: String,
    length: Number,
    width: Number,
    height: Number,
    type: Number,
    weight: Number,
    voyageId: String,
  },
  { timestamps: true },
);

export interface Cargo extends mongoose.Document {
  id: string;
  registrationNumber: string;
  length: number;
  width: number;
  height: number;
  type: CargoType;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
  voyageId: string;
}
