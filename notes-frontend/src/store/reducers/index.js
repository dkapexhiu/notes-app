import noteReducer from "./noteReducer";
import userReducer from "./userReducer";

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    noteReducer,
    userReducer
})
export default rootReducer;
