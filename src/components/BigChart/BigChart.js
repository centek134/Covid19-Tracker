import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Legend } from 'recharts';
import './BigChart.css';

const BigChart = (props) => {

  //data that we provide for chart
  const data = [
    { name: 'Confirmed Cases', value: props.case, fill: "#ff4800" },
    { name: 'Deaths', value: props.death, fill: "#000000" },
    { name: 'Recovered', value: props.recover, fill: "#15ff00" }
  ];
    return(
        <article className = "bigchart-cont">
            <h2>World Total</h2>
            <section style ={{width:"90%", height: "80%"}}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie className = "hello"
                    dataKey="value"
                    startAngle={0}
                    endAngle={360}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    fill="#8884d8"
                    label
                  />
                   <Legend align = "left" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </section>
        </article>
    );
};

export default BigChart;
