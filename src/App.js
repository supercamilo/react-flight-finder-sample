// @flow

import React, { Component } from 'react';
import './App.css';
import { Header, FilterBar, FlightChart } from './components';

class App extends Component {
    render() {

        return (
            <div className="App">
                <Header />
                <FilterBar />
                <FlightChart />
            </div>
        );
    }
}

export default App;
