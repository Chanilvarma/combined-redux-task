import React from 'react'
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { COLORS, renderCustomizedLabel, categoryGrouping, calcExpenses, calcIncome, clacAmount } from '../../helper/reUsableFunctions'
import { today } from '../../helper/dates';

const TodayChart = ({ expensesDateGroup, incomeDateGroup }) => {

    let categoryGroupArrays, Expense, Income
    if (expensesDateGroup[0] !== undefined) {

        // Grouping same date
        categoryGroupArrays = categoryGrouping(expensesDateGroup[0].items);
        // Calculating the Income and Expense
        Expense = calcExpenses(clacAmount(expensesDateGroup[0].items));
        if (incomeDateGroup[0] !== undefined && incomeDateGroup[0].date === today) {
            Income = calcIncome(clacAmount(incomeDateGroup[0].items))
        }

    }

    return (
        <div>
            {
                expensesDateGroup[0] === undefined ? (<h3>You don't have any transactions on {today}</h3>) : (<>
                    {
                        expensesDateGroup[0].date === today ? (
                            <>

                                <h3>{expensesDateGroup[0].date}</h3>
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
                                        isAnimationActive={true}
                                        data={categoryGroupArrays}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={80}
                                    >
                                        {categoryGroupArrays.map((entry, index) => (
                                            ((entry.name === "personal") && <Cell key={`cell-${index}`} fill={COLORS[2]} />)
                                            || ((entry.name === "travel") && <Cell key={`cell-${index}`} fill={COLORS[1]} />)
                                            || ((entry.name === "essential") && <Cell key={`cell-${index}`} fill={COLORS[0]} />)
                                        ))}
                                    </Pie>
                                    <Tooltip content={expensesDateGroup[0].items[0].category} />
                                </PieChart>
                            </>
                        ) : (<h3> You don't have any transactions on {today}</h3>)
                    }
                </>)
            }
        </div>
    )
}

export default TodayChart

