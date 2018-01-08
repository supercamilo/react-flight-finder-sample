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

    onOriginChange = (searchTerm: String) => {
        this.setState({ originSearchTerm: searchTerm })

        const { dispatch } = this.props;
        dispatch(actions.Airports.fetch(searchTerm, 'origin'));
    };

    onOriginSelect = (code: String) => {
        const { originAirports, dispatch } = this.props;

        const airport = originAirports.filter(a => a.code === code)[0];

        this.setState({ originSearchTerm: `${airport.code} - ${airport.city}` })
        dispatch(actions.Filters.selectAirport(code, 'origin'));
    };

    onDestinationChange = (searchTerm: String) => {
        this.setState({ destinationSearchTem: searchTerm })

        const { dispatch } = this.props;
        dispatch(actions.Airports.fetch(searchTerm, 'destination'));
    };

    onDestinationSelect = (code: String) => {
        const { destinationAirports, dispatch } = this.props;

        const airport = destinationAirports.filter(a => a.code === code)[0];

        this.setState({ destinationSearchTem: `${airport.code} - ${airport.city}` })
        dispatch(actions.Filters.selectAirport(code, 'destination'));
    };

    render() {
        const { originSearchTerm, destinationSearchTem } = this.state;
        const { originAirports, destinationAirports } = this.props;

        return (
            <header className="App-header">
                <h1 className="App-title">Flight Finder</h1>
                <Autocomplete
                    getItemValue={(item) => item.code}
                    items={originAirports}
                    renderItem={(item, isHighlighted) =>
                        <div key={item.code} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                            {`${item.code} - ${item.city}`}
                        </div>
                    }
                    value={originSearchTerm}
                    onChange={(e) => this.onOriginChange(e.target.value, 'origin')}
                    onSelect={(value) => this.onOriginSelect(value, 'destination')}
                />
                <Autocomplete
                    getItemValue={(item) => item.code}
                    items={destinationAirports}
                    renderItem={(item, isHighlighted) =>
                        <div key={item.code} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                            {`${item.code} - ${item.city}`}
                        </div>
                    }
                    value={destinationSearchTem}
                    onChange={(e) => this.onDestinationChange(e.target.value, 'destination')}
                    onSelect={(value) => this.onDestinationSelect(value, 'destination')}
                />
            </header>
        );
    }
}

export default connect(mapStateToProps)(Header);
