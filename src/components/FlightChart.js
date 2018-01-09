// @flow

import React, { Component } from 'react';
import type { RootState, Flight } from '../state/state';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => {
    return {
        flights: state.flights,
    };
};

class FlightChart extends Component<{ flights?: Array<Flight> }> {
    static defaultProps = {
        flights: [],
    };

    render() {

        const { flights } = this.props;

        // TODO: fix display formats
        const flightList = flights.map((flight) =>
            <li>
                {`${flight.airlineCode} ${flight.number}`}
                <br />
                {`${flight.origin} > ${flight.destination}`}
                <br />
                {`${flight.departure} > ${flight.arrival}`}
                <br />
                {`${flight.length}mi`}
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
