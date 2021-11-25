import React, { useContext } from 'react'
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { COLORS, renderCustomizedLabel, calAllExpenses, calcIncome, clacAmount } from '../../helper/reUsableFunctions'
// import { GlobalContext } from '../../context/GlobalState'
import useFirestore from '../../hooks/useFirestore';

const Chart = ({ expensesCategoryGroup }) => {
    // const { transactions } = useContext(GlobalContext)
    const { docs } = useFirestore('transactions')
    console.log(docs)

    // Calculating the Income and Expense
    const Income = calcIncome(clacAmount(docs));
    const Expense = calAllExpenses(clacAmount(docs))

    return (
        <div>
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
            {
                expensesCategoryGroup.length === 0 ?
                    (<h3>You Don't have any expenses. Please add expenses to display chart here..</h3>) : (
                        <>
                            <PieChart width={300} height={200}>
                                <Pie
                                    className='pie-style'
                                    dataKey="total"
                                    isAnimationActive={true}
                                    data={expensesCategoryGroup}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                >
                                    {expensesCategoryGroup.map((entry, index) => (
                                        ((entry.name === "personal") && <Cell key={`cell-${index}`} fill={COLORS[2]} />)
                                        || ((entry.name === "travel") && <Cell key={`cell-${index}`} fill={COLORS[1]} />)
                                        || ((entry.name === "essential") && <Cell key={`cell-${index}`} fill={COLORS[0]} />)

                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </>
                    )
            }

        </div>
    )
}

export default Chart
