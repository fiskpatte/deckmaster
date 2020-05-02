import { MongooseDocument } from "mongoose";

export const transformDbModel = (dbModel: MongooseDocument) => {
  let result = {
    id: dbModel.id,
    ...dbModel.toObject(),
  };
  delete result.__v;
  delete result._id;
  return result;
};

export const removeReadOnlyFields = (doc) => {
  let result = { ...doc };
  delete result.id;
  delete result.createdAt;
  delete result.updatedAt;

  return result;
}