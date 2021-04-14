import React from 'react';
import './SmallChart.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';





const SmallChart = (props) => {
    const data = [{name: 'Page A', uv: 800, pv: 300, amt: 2400},{name: 'Page b', uv: 400, pv: 250, amt: 2400},{name: 'Page c'},{name: 'Page c'}, {name: 'Page c'}];
    return(
        <article onClick={props.click} className = "smlchart-cont">
            <h2>{props.title}</h2>
            
            <LineChart width = {450} height = {300} data={data}>
                <Line type="monotone" dataKey = "uv" stroke="#8884d8" />
                <Line type="monotone" dataKey = "pv" stroke="#5323d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
            </LineChart>
        </article>
    );
};

export default SmallChart;