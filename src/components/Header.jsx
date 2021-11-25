import React from 'react'
import { Link } from 'react-router-dom'


const Header = ({ count }) => {
    const connected = navigator.onLine;
    return (
        <div className="ui menu">
            <div className="header item">
                <h2>Expenses Tracker</h2>
            </div>
            <div className="right menu">
                <Link to="/" >
                    <a className=" item" href="$">
                        Dashboard
                    </a>
                </Link>
                <Link to="/transaction" >
                    <a className=" item" href="$">
                        Add Transaction
                    </a>
                </Link>
                {
                    (count >= 1000 && connected) ? (
                        <Link to="/hangman" >
                            <a className=" item" href="$">
                                Play Game
                            </a>
                        </Link>
                    ) : null
                }
                <Link to='/history'>
                    <a className="item" href="$">
                        Transaction  History
                    </a>
                </Link>
            </div>

        </div >
    )
}

export default Header
