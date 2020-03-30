import { createStore, combineReducers, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import appReducer from "./reducers/appReducer";
import cargoReducer from "./reducers/cargoReducer";

const rootReducer = combineReducers({
  appReducer,
  cargoReducer
});
export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(logger));
export default store;
