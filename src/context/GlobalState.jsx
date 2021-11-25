// import React, { createContext, useReducer, useEffect } from 'react'
// import AppReducer from './AppReducer'
// // Intial State
// const initialState = {
//     transactions: []
// }

// // Create context
// export const GlobalContext = createContext(initialState)

// // Provider Component
// export const GlobalProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(AppReducer, initialState, () => {

//         // Getting data from localStorage
//         const localData = localStorage.getItem('state');
//         return localData ? JSON.parse(localData) : initialState
//     })

//     useEffect(() => {
//         // sending data to localStorage
//         localStorage.setItem('state', JSON.stringify(state))
//     }, [state])

//     // Actions
//     const deleteTransaction = (id) => {
//         dispatch({
//             type: 'DELETE_TRANSACTION',
//             payload: id
//         });
//     }

//     function addTransaction(transaction) {
//         dispatch({
//             type: 'ADD_TRANSACTION',
//             payload: transaction,
//         });
//     }


//     return (<GlobalContext.Provider value={{
//         transactions: state.transactions,
//         deleteTransaction,
//         addTransaction
//     }}>
//         {children}
//     </GlobalContext.Provider>)
// }