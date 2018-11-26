import { combineReducers } from "redux";

import UserReducer from "./user";
import ConcertReducer from "./concert";

const rootReducer = combineReducers({
  user: UserReducer,
  concerts: ConcertReducer
});

export default rootReducer;
