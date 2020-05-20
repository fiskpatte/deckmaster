import { CARGO_QUEUE_ACTION_TYPES } from "./cargoQueueActionTypes";
import { CargoQueueState } from "./cargoQueueState";

const initialState: CargoQueueState = {
  cargoQueue: [],
};
const cargoQueueReducer = (
  state = initialState,
  action: any
): CargoQueueState => {
  const { type, payload } = action;

  switch (type) {
    case CARGO_QUEUE_ACTION_TYPES.SET_CARGO_QUEUE:
      return {
        ...state,
        cargoQueue: payload,
      };
    default:
      return state;
  }
};

export default cargoQueueReducer;
