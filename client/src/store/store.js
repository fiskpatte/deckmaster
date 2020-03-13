import { createStore, combineReducers } from "redux";
import appReducer from './reducers/appReducer.js';
import authReducer from './reducers/authReducer.js';

const rootReducer = combineReducers({
    appReducer,
    authReducer
});

const store = createStore(rootReducer, {});

export default store;
