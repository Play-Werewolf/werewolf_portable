import { combineReducers } from 'redux';

import AuthReducer from "./AuthReducer";
import PagesReducer from "./PagesReducer";
import MultiplayerReducer from "./MultiplayerReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  pages: PagesReducer,
  mp: MultiplayerReducer
});

export default rootReducer;
