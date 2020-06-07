import { createStore, combineReducers, applyMiddleware } from "redux";
// import { createStore, combineReducers } from "redux";
import { logger } from "redux-logger";
import appReducer from "./app/appReducer";
import deckMapReducer from "./deckMap/deckMapReducer";
import cargoQueueReducer from "./cargoQueue/cargoQueueReducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { PersistPartial } from "redux-persist/lib/persistReducer";

const rootReducer = combineReducers({
  appReducer,
  deckMapReducer,
  cargoQueueReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'deckMapReducer',
    'cargoQueueReducer'
  ],
  stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer)

const store = createStore<RootState & PersistPartial, any, any, any>(persistedReducer, applyMiddleware(logger));
const persistor = persistStore(store);
// const store = createStore(rootReducer);

export {
  store,
  persistor
};
