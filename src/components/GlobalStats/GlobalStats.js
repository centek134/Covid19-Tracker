import React from 'react';
import './GlobalStats.css';

const GlobalStats = (props) => {
    return(
        <section className = "global-stats">
            <h2>Daily Global Cases:</h2>
            <article>
                <h3>New Cases: <span className = "red">+22235</span></h3>
            </article>
            <article>
                <h3>New Deaths: <span className = "black">+1122</span></h3>
            </article>
            <article>
                <h3>New Recovered: <span className = "green">+57742244</span></h3>
            </article>
        </section>
    );
};

export default GlobalStats;