import { post, get, axiosDelete } from "./verbs";

const controllerName = "cargoQueue";

export const getCargoQueue = async () => await get(controllerName);

export const addToCargoQueue = async (cargoQueueItem: any) =>
  await post(controllerName, cargoQueueItem);

export const removeFromCargoQueue = async (cargoQueueItemId: string) =>
  await axiosDelete(controllerName, cargoQueueItemId);
