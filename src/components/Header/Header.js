import React from 'react';
import './Header.css';

const Header = (props) => {
    return(
        <header className = "head">
            <h1>Covid-19 Tracker</h1>
            <div>
            <p>Select country:</p>
                <select>
                    <option>option 1</option>
                    <option>option 2</option>
                    <option>option 3</option>
                    <option>option 4</option>
                    <option>option 5</option>
                    <option>option 6</option>
                </select>
            </div>
        </header>
    );
};

export default Header;