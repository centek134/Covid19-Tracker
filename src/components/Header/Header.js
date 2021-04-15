import React from 'react';
import './Header.css';

const Header = (props) => {
    return(
        <header className = "head">
            <h1>Covid-19 Tracker</h1>
            <div>
            <p>Select country:</p>
                <select>
                {props.shouldRender? props.selectOptions.map(country => {
                        return(
                            <option key = {country}>{country}</option>
                        );
                    })
                    : null
                
                } 
                </select>
            </div>
        </header>
    );
};

export default Header;