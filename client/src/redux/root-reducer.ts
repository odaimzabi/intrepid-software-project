import { combineReducers } from "redux";
import firstPageReducer from "../modules/first-page/reducer";
const rootReducer = combineReducers({
  firstPageReducer,
});

export default rootReducer;
