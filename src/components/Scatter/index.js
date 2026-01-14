import React from 'react'
import San from './Sandian/index.js';
import NewSan from './NewScatter/index.js';

const Scatter = () => {
    return (
        <div>

            <header className="App-header">
                散点图
                {/* <div style={{ borderRadius: "50%", width: '20px', height: '20px', backgroundColor: 'red' }}></div> */}
            </header>
            <San></San>

            <header className="App-header">
                新散点图
                <div style={{ borderRadius: "50%", width: '20px', height: '20px', backgroundColor: 'red' }}></div>
            </header>
            <NewSan></NewSan>
        </div>
    )
}
export default Scatter