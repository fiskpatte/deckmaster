import { Document } from 'mongoose';

export const transformDbModel = <T extends Document>(dbModel: T) => {
  if (!dbModel) return dbModel;

  let result = ({
    id: dbModel.id,
    ...dbModel.toObject(),
  } as unknown) as T;

  delete result.__v;
  delete result._id;
  return result;
};

export const transformDbModelAndRefs = <T extends Document>(
  dbModel: T,
  ...refs: string[]
) => {
  const resultTransformed = transformDbModel(dbModel);
  for (const ref of refs) {
    resultTransformed[ref] = transformDbModel(dbModel[ref]);
  }
  return resultTransformed;
};

export const removeReadOnlyFields = doc => {
  let result = { ...doc };
  delete result.id;
  delete result.createdAt;
  delete result.updatedAt;

  return result;
};
