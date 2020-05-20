import { CargoQueueItem } from "../../types/cargoQueueItem";
import { CARGO_QUEUE_ACTION_TYPES } from "./cargoQueueActionTypes";

export const setCargoQueue = (cargoQueue: CargoQueueItem[]) => ({
  type: CARGO_QUEUE_ACTION_TYPES.SET_CARGO_QUEUE,
  payload: cargoQueue,
});

const cargoQueueActions = {
  setCargoQueue,
};

export default cargoQueueActions;
