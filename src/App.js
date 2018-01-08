// @flow

import React, { Component } from 'react';
import './App.css';
import { FilterBar, FlightChart } from './components';
import { StoreProvider } from './state/index';
import { Provider } from 'react-redux';
import { Grid, Row } from 'react-flexbox-grid';

const store = StoreProvider.init();

class App extends Component {
    render() {

        return (
            <Provider store={store}>
                <Grid className="App">
                    <Row>
                        <header className="App-header">
                            <h1 className="App-title">Flight Finder</h1>
                        </header>
                    </Row>
                    <Row>
                        <FilterBar />
                    </Row>
                    <Row>
                        <FlightChart />
                    </Row>
                </Grid>
            </Provider>
        );
    }
}

export default App;
