import { createStore, combineReducers } from "redux";
import appReducer from './reducers/appReducer';

const rootReducer = combineReducers({
    appReducer
});
export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, {});
export default store;
