import { createStore, combineReducers, applyMiddleware } from "redux";
// import { createStore, combineReducers } from "redux";
import { logger } from "redux-logger";
import appReducer from "./app/appReducer";
import deckMapReducer from "./deckMap/deckMapReducer";

const rootReducer = combineReducers({
  appReducer,
  deckMapReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(logger));
// const store = createStore(rootReducer);

export default store;
