import { combineReducers } from "redux";
import user from "./users";
import institutions from "./institutions";

const rootReducer = combineReducers({
  user,
  institutions,
});

export default rootReducer;
