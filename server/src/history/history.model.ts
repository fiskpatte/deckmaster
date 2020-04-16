import * as mongoose from 'mongoose';

export const HistorySchema = new mongoose.Schema({
  userId: String,
  created: Number,
  description: String,
});

export interface History extends mongoose.Document {
  id: string;
  userId: string;
  created: Date;
}
