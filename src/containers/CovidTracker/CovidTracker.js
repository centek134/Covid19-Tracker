import React, { Component } from 'react';
import './CovidTracker.css';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import BigChart from '../../components/BigChart/BigChart.js';
import SmallChart from '../../components/SmallChart/SmallChart.js';

class CovidTracker extends Component{

    componentDidMount = () => {
        fetch('https://api.covid19api.com/summary',{
            method: 'GET',
            redirect: 'follow'
            })
            .then(response => response.json())
            .then(result => {
                let countrySlug = [];
                console.log(result);
                for(let countryId of result.Countries){
                    countrySlug.push(countryId.Slug)       //saving countryIDs so i can add them as option in select
                };
                this.setState({
                    stats:result,
                    countryId: countrySlug,                 
                    didMountRender: true    //now that we have data, we can render options in select tag
                });
            })
            .catch(error => console.log('error', error));
    }

    
    state = {
        stats : null,       //data from fetch, about covid19 on world and in countries
        countryId: null,    //country names, used as option in select in header 
        didMountRender: false,  //checks if we fetched data, so we can render country names as <option in select tag
        last7Days:{         //data of last 7 days in specific country 
            death: null,
            activeCases:null,
            recover:null
        }
    };

    fetchDataForCharts = (countryName) => {     //fetching data about specific country (selected from select tag)
        var active = [];
        var deaths = [];
        var recovered = [];


        fetch(`https://api.covid19api.com/total/country/${countryName}`, {
            method: 'GET',
            redirect: 'follow'
          })
            .then(response => response.json())
            .then(result => {
                for(let i = result.length - 7; i < result.length; i++){ //looping through fetched data, taking info from last 7 days
                    active.push(result[i].Active);
                    deaths.push(result[i].Deaths);
                    recovered.push(result[i].Recovered);
                }
                console.log(result);
                this.setState({last7Days:{  //setting data to state
                    activeCases: active,
                    death: deaths,
                    recover: recovered }
                });
            })
            .catch(error => console.log('error', error));
    };



    render(){
        return(
            <div className ="wrapp">
                <Header
                    countrySwitch = {(e) => this.fetchDataForCharts(e.target.value)}
                    shouldRender = {this.state.didMountRender}
                    selectOptions = {this.state.countryId}/>
                <main>
                    <section onClick = {() => console.log("death " + this.state.last7Days.death, "cases " + this.state.last7Days.activeCases, "rec " + this.state.last7Days.recover)} className = "sml-chart">
                        <SmallChart ourData = {this.state.last7Days.activeCases} title = "Active Cases"/>
                        <SmallChart ourData = {this.state.last7Days.death} title = "Total Deaths"/>
                        <SmallChart ourData = {this.state.last7Days.recover} title = "Total Recovered"/>
                    </section>
                    <section className = "big-chart">
                        <BigChart/>
                        <BigChart/>
                    </section>
                </main>
                <Footer/>
            </div>
        );
    }
}

export default CovidTracker;