import { post, get, axiosDelete } from "./verbs";
import { CargoQueueItem } from "../types/CargoQueueItem";

const controllerName = "cargoQueue";

export const getCargoQueue = async () => await get(controllerName);

export const addToCargoQueue = async (cargoQueueItem: CargoQueueItem) =>
  await post(controllerName, cargoQueueItem);

export const removeFromCargoQueue = async (cargoQueueItemId: string) =>
  await axiosDelete(controllerName, cargoQueueItemId);
