/* eslint-disable no-unreachable */
import * as types from "./actiontype";

export const addTransaction = (transaction) => ({
  type: types.ADD_TRANSACTION,
  payload: transaction,
});

export const deleteTransaction = (id) => ({
  type: types.DELETE_TRANSACTION,
  payload: id,
});
