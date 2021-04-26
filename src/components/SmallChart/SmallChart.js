import React from 'react';
import './SmallChart.css';
import { ResponsiveContainer ,LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


const SmallChart = (props) => {
    let data = [];
    let date = props.date;
    if(props.ourData !== null){   
        for(let item of props.ourData){
            data.push({
                total: item     //pushing data about deaths,cases,recovered
            });
        };
        for(let i = 0; i < data.length; i++){
             data[i].date = date[i]; //pushing info about date so that it matches cases and can be displayed in chart
        };
    };

    return(
        <article onClick={props.click} className = "smlchart-cont">
            <h2>{props.title}</h2>
            <div style = {{width: '90%', height: '75%'}}>
                <ResponsiveContainer>
                    <LineChart  data={data}>
                        <Line type="monotone" dataKey = "total" strokeWidth = {3} stroke = {props.color} />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis hide = "true" dataKey = "date" />
                        <YAxis />
                        <Tooltip/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </article>
    );
};

export default SmallChart;