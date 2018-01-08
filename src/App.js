// @flow

import React, { Component } from 'react';
import './App.css';
import { Header, FilterBar, FlightChart } from './components';
import { StoreProvider } from './state/index';
import { Provider } from 'react-redux';

const store = StoreProvider.init();

class App extends Component {
    render() {

        return (
            <div className="App">
                <Provider store={store}>
                    <div>
                        <Header />
                        <FilterBar />
                        <FlightChart />
                    </div>
                </Provider>
            </div>
        );
    }
}

export default App;
