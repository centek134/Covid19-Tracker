import React, { Component } from 'react';
import './CovidTracker.css';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import BigChart from '../../components/BigChart/BigChart.js';
import SmallChart from '../../components/SmallChart/SmallChart.js';

class CovidTracker extends Component{

    componentDidMount(){
        fetch("https://api.covid19api.com/summary",{
            method: 'GET',
            redirect: 'follow'})
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.setState({stats:result})
            })
            .catch(error => console.log('error', error));
    }

    state = {
        stats : null
    }

    Clicked = () => {
        console.log(this.state.stats);
    }
    render(){
        return(
            <div className ="wrapp">
                <Header/>
                <main>
                    <section className = "sml-chart">
                        <SmallChart click={this.Clicked} title = "Dzienne zachorowania"/>
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