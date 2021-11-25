import { combineReducers } from "redux";
import transactionsReducer from "./reducer";
const rootReducer = combineReducers({
  transactions: transactionsReducer,
});

export default rootReducer;
