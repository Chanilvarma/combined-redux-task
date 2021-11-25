import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

import { projectFirestore, projectStorage } from '../firebase/config'
const Transaction = ({ transaction }) => {

    //console.log(transaction)
    // const { deleteTransaction } = useContext(GlobalContext);
    const deleteTransaction = async (id, url) => {
        await projectFirestore.collection('transactions').doc(id).delete();
        let pictureRef = projectStorage.refFromURL(url);
        await pictureRef.delete()
    }

    // list item style
    const sign = transaction.amount < 0 ? '-' : '+'
    const className = transaction.amount < 0 ? 'minus' : 'plus'
    return (
        <li className={className}>
            <span>{transaction.date} </span>
            <span>{transaction.text}</span>
            {transaction.name} <span>{sign}${Math.abs(transaction.amount)}</span>
            <span><img src={transaction.imageUrl} alt="img" /></span>
            <button onClick={() => deleteTransaction(transaction.id, transaction.imageUrl)} className="delete-btn">x</button>
        </li>
    )
}

export default Transaction
