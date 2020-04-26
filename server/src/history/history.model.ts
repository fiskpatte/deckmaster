import * as mongoose from 'mongoose';

export const HistorySchema = new mongoose.Schema({
  username: String,
  created: Date,
  description: String,
});

export interface History extends mongoose.Document {
  id: string;
  username: string;
  created: Date;
  description: string;
}
