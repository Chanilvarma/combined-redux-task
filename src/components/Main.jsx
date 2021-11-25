import React, { useContext, useState } from 'react'
// import { GlobalContext } from '../context/GlobalState'
import { categoryGrouping, dateGrouping } from '../helper/reUsableFunctions'
import Balance from './Balance'
import ChartCard from './pi-charts/ChartCard'
import useFirestore from '../hooks/useFirestore'


const Main = () => {
    const connected = navigator.onLine;
    // const { transactions } = useContext(GlobalContext);
    const { docs } = useFirestore('transactions');


    // const [buttonProp, setButtonProp] = useState(false)

    // Separating Income and Expenses
    let income = [];
    let expense = [];

    const calcIncomeAndExpenseArray = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].amount < 0) {
                let temp = JSON.parse(JSON.stringify(arr[i]));
                temp.amount = -1 * arr[i].amount
                expense.push(temp)
            } else {
                income.push(arr[i])
            }
        }
    }

    calcIncomeAndExpenseArray(docs)

    // Grouping same category data
    const incomeCategoryGroup = categoryGrouping(income);
    const expensesCategoryGroup = categoryGrouping(expense);

    // Grouping same date data
    const incomeDateGroup = dateGrouping(income);
    const expensesDateGroup = dateGrouping(expense);

    return (
        <>

            <div className="main">
                <div className="balance">
                    <Balance />
                </div>
                <div>
                    <h4>Expenses Pi-chart</h4>
                    <ChartCard
                        expensesCategoryGroup={expensesCategoryGroup}
                        expensesDateGroup={expensesDateGroup}
                        incomeDateGroup={incomeDateGroup}
                        incomeCategoryGroup={incomeCategoryGroup}
                    />
                </div>
            </div >

        </>

    )
}

export default Main
