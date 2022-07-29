import rootReducer from "./reducers";
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
  
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
  
export default store;
