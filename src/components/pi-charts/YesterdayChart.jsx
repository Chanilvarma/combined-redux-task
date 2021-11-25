
import React from 'react'
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { COLORS, renderCustomizedLabel, filterDataBasedOnDate, categoryGrouping, calcIncome, calcExpenses, clacAmount } from '../../helper/reUsableFunctions'
import { yesterday } from '../../helper/dates'


const YesterdayChart = ({ expensesDateGroup, incomeDateGroup }) => {

    // Filter Data based on Date
    const expensesData = filterDataBasedOnDate(expensesDateGroup, yesterday)
    const incomeData = filterDataBasedOnDate(incomeDateGroup, yesterday)

    // Calculating the Income and Expense
    let Expense, Income, expensesGroupArray
    if (expensesData !== undefined) {
        // Grouping same category data
        expensesGroupArray = categoryGrouping(expensesData)
        Expense = calcExpenses(clacAmount(expensesData));

        if (incomeData !== undefined) {
            Income = calcIncome(clacAmount(incomeData))
        }
    }
    return (
        <div>
            {
                expensesGroupArray.length === 0 ? (<h3>You Don't have any expenses {yesterday}</h3>) : (
                    <>
                        <h3>{yesterday}</h3>
                        <div className="inc-exp-container">
                            <div>
                                <h4>Income</h4>
                                <p className="money plus">+₹{Income}</p>
                            </div>
                            <div>
                                <h4>Expense</h4>
                                <p className="money minus">-₹{Expense}</p>
                            </div>
                        </div>

                        <PieChart width={300} height={200}>
                            <Pie
                                className='pie-style'
                                dataKey="total"
                                data={expensesGroupArray}
                                isAnimationActive={true}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                            >
                                {expensesGroupArray.map((entry, index) => (
                                    ((entry.name === "personal") && <Cell key={`cell-${index}`} fill={COLORS[2]} />)
                                    || ((entry.name === "travel") && <Cell key={`cell-${index}`} fill={COLORS[1]} />)
                                    || ((entry.name === "essential") && <Cell key={`cell-${index}`} fill={COLORS[0]} />)
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </>)
            }


        </div>
    )
}

export default YesterdayChart


