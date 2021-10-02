import React from 'react';
import { Link } from 'react-router-dom'

const Home = (props) => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Nursing Placement Scheduler Prototype</h1>
                <Link className="App-link" to="/students">
                View students
                </Link>
            </header>
        </div>
    )
}

export default Home;