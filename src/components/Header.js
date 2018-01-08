// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Autocomplete } from './';
import type { RootState, Airport, AirportType } from '../state';
import * as actions from '../state/actions';

const mapStateToProps = (state: RootState) => {
    return {
        origin: state.filters.origin,
        destination: state.filters.destination,
        originAirports: state.airports.origin,
        destinationAirports: state.airports.destination,
    };
};

class Header extends Component<{ originAirports: Array<Airport>, destinationAirports: Array<Airport> }
    , { originSearchTerm: String, destinationSearchTem: String }> {
    constructor(props) {
        super(props);
        this.state = {
            originSearchTerm: '',
            destinationSearchTem: '',
        };
    }

    onOriginChange = (searchTerm: String, type: AirportType) => {
        this.setState({ originSearchTerm: searchTerm })

        const { dispatch } = this.props;
        dispatch(actions.Airports.fetch(searchTerm, 'origin'));
    };

    onDestinationChange = (searchTerm: String) => {
        this.setState({ destinationSearchTem: searchTerm })

        const { dispatch } = this.props;
        dispatch(actions.Airports.fetch(searchTerm, 'destination'));
    };

    render() {
        const { originSearchTerm, destinationSearchTem } = this.state;
        const { originAirports, destinationAirports } = this.props;

        return (
            <header className="App-header">
                <h1 className="App-title">Flight Finder</h1>
                <Autocomplete
                    getItemValue={(item) => `${item.code} - ${item.name} - ${item.city}, ${item.state}`}
                    items={originAirports}
                    renderItem={(item, isHighlighted) =>
                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                            {item.label}
                        </div>
                    }
                    value={originSearchTerm}
                    onChange={(e) => this.onOriginChange(e.target.value, 'origin')}
                />
                <Autocomplete
                    getItemValue={(item) => `${item.code} - ${item.name} - ${item.city}, ${item.state}`}
                    items={destinationAirports}
                    renderItem={(item, isHighlighted) =>
                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                            {item.label}
                        </div>
                    }
                    value={destinationSearchTem}
                    onChange={(e) => this.onDestinationChange(e.target.value, 'destination')}
                />
            </header>
        );
    }
}

export default connect(mapStateToProps)(Header);
