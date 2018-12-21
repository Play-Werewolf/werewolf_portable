import { combineReducers } from 'redux';

import AuthReducer from "./AuthReducer";
import PagesReducer from "./PagesReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  pages: PagesReducer
});

export default rootReducer;
