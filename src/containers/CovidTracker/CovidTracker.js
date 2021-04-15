import React, { Component } from 'react';
import './CovidTracker.css';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import BigChart from '../../components/BigChart/BigChart.js';
import SmallChart from '../../components/SmallChart/SmallChart.js';

class CovidTracker extends Component{

    componentDidMount = () => {
        fetch("https://api.covid19api.com/summary",{
            method: 'GET',
            redirect: 'follow'})
            .then(response => response.json())
            .then(result => {
                console.log(result)
                let countrySlug = [];
                for(let countryId of result.Countries){
                    countrySlug.push(countryId.Slug)       //saving countryIDs so i can add them ass
                };
                this.setState({
                    stats:result,
                    countryId: countrySlug,
                    didMountRender: true
                })
            })
            .catch(error => console.log('error', error));
    }

    
    state = {
        stats : null,
        countryId: null,
        didMountRender: false,
        last7Days:{
            death: null,
            newCases:null,
            recover:null
        }
    }



    fetchDataForCharts = (countryName) => {
            var cases = [];
            var deaths = [];
            var recovered = [];
          fetch(`https://api.covid19api.com/total/country/${countryName}/status/confirmed`, {
            method: 'GET',
            redirect: 'follow'
          })
            .then(response => response.json())
            .then(result => {
                for(let i = result.length - 1; i> result.length - 8; i--){
                    cases.push(result[i].Cases);
                }})
            .catch(error => console.log('error', error));

            fetch(`https://api.covid19api.com/total/country/${countryName}/status/recovered`, {
                method: 'GET',
                redirect: 'follow'
              })
                .then(response => response.json())
                .then(result => {
                    for(let i = result.length - 1; i> result.length - 8; i--){
                        deaths.push(result[i].Cases);
                    }})
                .catch(error => console.log('error', error));

                fetch(`https://api.covid19api.com/total/country/${countryName}/status/deaths`, {
                    method: 'GET',
                    redirect: 'follow'
                  })
                    .then(response => response.json())
                    .then(result => {
                        for(let i = result.length - 1; i> result.length - 8; i--){
                            recovered.push(result[i].Cases);
                        }
                    })
                    .catch(error => console.log('error', error));

                this.setState({last7Days:{
                    newCases:cases,
                    death: deaths,
                    recover: recovered }
                })
    }

    render(){
        return(
            <div className ="wrapp">
                <Header shouldRender = {this.state.didMountRender} selectOptions = {this.state.countryId}/>
                <main>
                    <section onClick = {() => console.log("death" + this.state.last7Days.death, "cases" + this.state.last7Days.newCases, "rec" + this.state.last7Days.recover)} className = "sml-chart">
                        <SmallChart click={() => this.fetchDataForCharts("afghanistan")} title = "Dzienne zachorowania"/>
                        <SmallChart title = "Dzienne zgony"/>
                        <SmallChart title = "Całkowite przypadki"/>
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