import React from 'react'
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { COLORS, renderCustomizedLabel, categoryGrouping, filterDataBasedOnDates, calcExpenses, clacAmount, calcIncome } from '../../helper/reUsableFunctions'
import { firstDate, lastDate } from '../../helper/dates';

const LastMonthChart = ({ expensesCategoryGroup, incomeCategoryGroup, }) => {

    // Filter Data based on Date
    const expensesGroup = filterDataBasedOnDates(expensesCategoryGroup)
    const incomeGroup = filterDataBasedOnDates(incomeCategoryGroup)

    // Calculating the Income and Expense
    const Expense = calcExpenses(clacAmount(expensesGroup));
    const Income = calcIncome(clacAmount(incomeGroup))

    // Grouping same category data
    const expensesGroupArray = categoryGrouping(expensesGroup);

    return (
        <div>
            {
                expensesGroupArray.length === 0 ? (<h3>You Don't have any transactions between {firstDate} and {lastDate}</h3>) : (
                    <>
                        <h3>{firstDate} to {lastDate}</h3>
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

export default LastMonthChart

















