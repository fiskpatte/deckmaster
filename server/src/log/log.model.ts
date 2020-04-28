import * as mongoose from 'mongoose';

export const LogSchema = new mongoose.Schema({
  username: String,
  created: Date,
  text: String,
  voyageId: String,
});

export interface Log extends mongoose.Document {
  id: string;
  username: string;
  created: Date;
  text: string;
  voyageId: string;
}
