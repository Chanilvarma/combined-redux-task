import * as types from "./actiontype";

export const initialState = {
  transactions: [],
};
const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };
    case types.ADD_TRANSACTION:
      return {
        ...state,
        transactions: [action.payload],
      };
    default:
      return state;
  }
};
export default transactionsReducer;
