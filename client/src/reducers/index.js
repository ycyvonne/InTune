import { combineReducers } from "redux";

import UserReducer from "./user";
import ConcertReducer from "./concert";

/** Actions
 * @module reducers
 * @requires actions
 * @description Client side root reducer that combines state/store updates
 */

/**
 * @description Makes global state/store that combines the imported reducers
 * @name RootReducer
 * @function
 * @memberof module:reducers
 */
const rootReducer = combineReducers({
  user: UserReducer,
  concerts: ConcertReducer
});

export default rootReducer;
