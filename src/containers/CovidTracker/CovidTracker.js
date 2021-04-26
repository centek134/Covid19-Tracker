import React, { Component } from 'react';
import './CovidTracker.css';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import BigChart from '../../components/BigChart/BigChart.js';
import SmallChart from '../../components/SmallChart/SmallChart.js';
import GlobalStats from '../../components/GlobalStats/GlobalStats.js';

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
                    didMountRender: true,    //now that we have data, we can render options in select tag
                    Global:{
                        date: result.Global.Date.slice(0,10),
                        newCases: result.Global.NewConfirmed,
                        newDeaths: result.Global.NewDeaths,
                        newRecover: result.Global.NewRecovered,
                        totalCases: result.Global.TotalConfirmed,
                        totalDeaths: result.Global.TotalDeaths,
                        totalRecover: result.Global.TotalRecovered
                    }
                });
            })
            .catch(error => console.log('error', error));
    }

    
    state = {
        actualCountry: null,
        stats : null,       //data from fetch, about covid19 on world and in countries
        countryId: null,    //country names, used as option in select in header 
        didMountRender: false,  //checks if we fetched data, so we can render country names as <option in select tag
        last30Days:{         //data of last 7 days in specific country 
            death: null,
            activeCases: null,
            recover: null,
            date: null
        },
        Global:{    // data fetched for bigChart and globalstats componenst, its all about global covid cases
            date: null,
            newCases: null,
            newDeaths: null,
            newRecover: null,
            totalCases: null,
            totalDeaths: null,
            totalRecover: null
        }
    };

    fetchDataForCharts = (countryName) => {     //fetching data about specific country (selected from select tag)
        let active = [];
        let deaths = [];
        let recovered = [];
        let date = [];


        fetch(`https://api.covid19api.com/total/country/${countryName}`, {
            method: 'GET',
            redirect: 'follow'
          })
            .then(response => response.json())
            .then(result => {
                for(let i = result.length - 30; i < result.length; i++){ //looping through fetched data, taking info from last 30 days
                    active.push(result[i].Active);
                    deaths.push(result[i].Deaths);          //pushing all info to earlier created arrays
                    recovered.push(result[i].Recovered);
                    date.push(result[i].Date.slice(0,10));
                    
                };
                this.setState({last30Days:{  //setting data to state
                    activeCases: active,
                    death: deaths,
                    recover: recovered,
                    date: date,
                },
                actualCountry: `${countryName}`
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
                    <section className = "sml-chart">
                        <h2 className = "sml-title">{this.state.actualCountry? `${this.state.actualCountry}, data from last 30 days:` : `Select country`}</h2>
                        <div className = "flexwrap">
                            <SmallChart color = "#ff4800" date = {this.state.last30Days.date} ourData = {this.state.last30Days.activeCases} title = "Active Cases"/>
                            <SmallChart color = "#000000" date = {this.state.last30Days.date} ourData = {this.state.last30Days.death} title = "Total Deaths"/>
                            <SmallChart color = "#15ff00" date = {this.state.last30Days.date} ourData = {this.state.last30Days.recover} title = "Total Recovered"/>
                        </div>
                    </section>
                    <section className = "big-chart">
                        <h2 className = "big-title">Global data from {this.state.Global.date}</h2>
                        <div className = "big-chart-flex">
                            <GlobalStats
                            case = {this.state.Global.newCases}
                            death = {this.state.Global.newDeaths}
                            recover = {this.state.Global.newRecover}
                            />
                            <BigChart
                            case = {this.state.Global.totalCases}
                            death = {this.state.Global.totalDeaths}
                            recover = {this.state.Global.totalRecover}
                            />
                        </div>
                    </section>
                </main>
                <Footer/>
            </div>
        );
    };
};

export default CovidTracker;