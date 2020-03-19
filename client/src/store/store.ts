import { createStore, combineReducers } from "redux";
import appReducer from './reducers/appReducer';
import cargoReducer from './reducers/cargoReducer';

const rootReducer = combineReducers({
    appReducer,
    cargoReducer
});
export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, {});
export default store;
