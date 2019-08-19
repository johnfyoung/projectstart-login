import { combineReducers } from "redux";

import auth from "./auth";
import errors from "./errors";
import install from "./install";

const rootReducer = combineReducers({
  auth,
  install,
  errors
});

export default rootReducer;
