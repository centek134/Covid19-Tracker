import React from 'react';
import './SmallChart.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


const SmallChart = (props) => {
    let data = [];
    if(props.ourData !== null){   
        for(let item of props.ourData){
            data.push({
                name: 'Page A',
                uv: item
            });
        };
    };

    return(
        <article onClick={props.click} className = "smlchart-cont">
            <h2>{props.title}</h2>
            
            <LineChart width = {450} height = {300} data={data}>
                <Line type="monotone" dataKey = "uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip/>
            </LineChart>
        </article>
    );
};

export default SmallChart;