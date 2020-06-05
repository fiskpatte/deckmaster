import * as mongoose from 'mongoose';

export const LogSchema = new mongoose.Schema(
  {
    username: String,
    text: String,
    voyageId: String,
  },
  { timestamps: true },
);

export interface Log extends mongoose.Document {
  id: string;
  username: string;
  text: string;
  voyageId: string;
  createdAt: Date;
  updatedAt: Date;
}
