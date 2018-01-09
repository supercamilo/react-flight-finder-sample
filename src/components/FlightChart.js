// @flow

import React, { Component } from 'react';
import type { RootState, Flight, Filters } from '../state/state';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => {
    return {
        flights: state.flights,
        filters: state.filters,
    };
};

class FlightChart extends Component<{ flights?: Array<Flight>, filters?: Filters }> {
    static defaultProps = {
        flights: [],
    };

    render() {

        const { flights, filters } = this.props;

        const filteredFlights = flights.filter((f) => filters.airlines.has(f.airlineCode));

        filteredFlights.sort(function(a, b) {
            return a[filters.sortBy] - b[filters.sortBy];
        });

        // TODO: fix display formats
        const flightList = filteredFlights.map((flight) =>
            <li>
                {`${flight.airlineCode} ${flight.number}`}
                <br />
                {`${flight.origin} > ${flight.destination}`}
                <br />
                {`${flight.departure} > ${flight.arrival}`}
                <br />
                {`${flight.duration}mi`}
                <br />
                {`${flight.averageSpeed}mph`}
            </li>
        );

        return (
            <section>
                <ul>
                    {flightList}
                </ul>
            </section>
        );
    }
}

export default connect(mapStateToProps)(FlightChart);
