import React, { useContext } from 'react'
// import { GlobalContext } from '../context/GlobalState'
import useFirestore from '../hooks/useFirestore';

const Balance = () => {
    // const { transactions } = useContext(GlobalContext)
    const { docs } = useFirestore('transactions')

    // Calculating the total amount
    let amounts, total
    const calcTotal = (arr) => {
        amounts = arr.map(transaction => transaction.amount);
        total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    }

    calcTotal(docs)


    return (
        <>
            <h4>Your Balance</h4>
            <h1 >₹{total}</h1>
        </>
    )
}

export default Balance
