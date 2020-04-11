export const transformDbModel = dbModel => {
  let result = {
    id: dbModel.id,
    ...dbModel._doc,
  };
  delete result.__v;
  delete result._id;

  return result;
};
