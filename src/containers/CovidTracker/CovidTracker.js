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
                    didMountRender: true
                });
            })
            .catch(error => console.log('error', error));
    }

    
    state = {
        stats : null,
        countryId: null,
        actualCountry:null,
        didMountRender: false,  //checks if we fetched data, so we can render country names in select tag
        last7Days:{
            death: null,
            activeCases:null,
            recover:null
        }
    };

    fetchDataForCharts = (countryName) => {
        var active = [];
        var deaths = [];
        var recovered = [];


        fetch(`https://api.covid19api.com/total/country/${countryName}`, {
            method: 'GET',
            redirect: 'follow'
          })
            .then(response => response.json())
            .then(result => {
                for(let i = result.length - 7; i < result.length; i++){
                    active.push(result[i].Active);
                    deaths.push(result[i].Deaths);
                    recovered.push(result[i].Recovered);
                }
                console.log(result);
                this.setState({last7Days:{
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