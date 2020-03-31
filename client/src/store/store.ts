// import { createStore, combineReducers, applyMiddleware } from "redux";
import { createStore, combineReducers } from "redux";
// import { logger } from "redux-logger";
import appReducer from "./reducers/appReducer";
import cargoReducer from "./reducers/cargoReducer";

const rootReducer = combineReducers({
  appReducer,
  cargoReducer
});
export type RootState = ReturnType<typeof rootReducer>;

// const store = createStore(rootReducer, applyMiddleware(logger));
const store = createStore(rootReducer);

export default store;
