import { createStore, combineReducers } from "redux";
import appReducer from './reducers/appReducer.js';

const rootReducer = combineReducers({
    appReducer,
});

const store = createStore(rootReducer, {});

export default store;
