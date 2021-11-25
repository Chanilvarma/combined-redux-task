import React, { useState } from 'react'
import Chart from './Chart'
import TodayChart from './TodayChart'
import YesterdayChart from './YesterdayChart'
import LastMonthChart from './LastMonthChart'
import ChartDesc from './ChartDesc'


const ChartCard = ({ expensesCategoryGroup, incomeCategoryGroup, expensesDateGroup, incomeDateGroup }) => {
    const [active, setActive] = useState('all')
    return (
        <div className="card text-center" >
            <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                        <button className={active === 'all' ? 'nav-link active' : 'nav-link'} onClick={() => setActive('all')}>
                            All
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className={active === 'today' ? 'nav-link active' : 'nav-link'} onClick={() => setActive('today')} >
                            Today
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className={active === 'yesterday' ? 'nav-link active' : 'nav-link'} onClick={() => setActive('yesterday')}>
                            Yesterday
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className={active === 'lastmonth' ? 'nav-link active' : 'nav-link'} onClick={() => setActive('lastmonth')}>
                            Last Month
                        </button>
                    </li>
                </ul>
            </div>
            <div className="card-body">
                {active === 'all' && <Chart expensesCategoryGroup={expensesCategoryGroup} />}
                {active === 'today' && <TodayChart expensesDateGroup={expensesDateGroup} incomeDateGroup={incomeDateGroup} />}
                {active === 'yesterday' && <YesterdayChart expensesDateGroup={expensesDateGroup} incomeDateGroup={incomeDateGroup} />}
                {active === 'lastmonth' && <LastMonthChart expensesCategoryGroup={expensesCategoryGroup} incomeCategoryGroup={incomeCategoryGroup} />}
            </div>
            <div className="card-foter">
                <ChartDesc />
            </div>
        </div>
    )
}

export default ChartCard
