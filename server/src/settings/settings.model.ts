import * as mongoose from 'mongoose';

export const SettingsSchema = new mongoose.Schema({
  vesselId: String,
  bumperToBumperDistance: Number,
});

export interface Settings extends mongoose.Document {
  id: string;
  vesselId: string;
  bumperToBumperDistance: number;
}

export class SettingsDTO {
  id: string;
  vesselId: string;
  bumperToBumperDistance: number;
}
