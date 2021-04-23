import React from 'react';
import './GlobalStats.css';

const GlobalStats = (props) => {
    return(
        <section className = "global-stats">
            <h2>Daily Global Cases</h2>
            <article>
                <h3>New Cases</h3>
                <p className = "red">{props.case}</p>
            </article>
            <article>
                <h3>New Deaths</h3>
                <p className = "black">{props.death}</p>
            </article>
            <article>
                <h3>New Recovered</h3>
                <p className = "green">{props.recover}</p>
            </article>
        </section>
    );
};

export default GlobalStats;