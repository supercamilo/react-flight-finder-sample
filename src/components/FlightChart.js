// @flow

import React, { Component } from 'react';
import type { RootState, Flight, Filters, Airline } from '../state/state';
import { FlightDetails } from './';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import moment from 'moment';

const mapStateToProps = (state: RootState) => {
    return {
        flights: state.flights,
        filters: state.filters,
        airlines: state.airlines,
    };
};

class FlightChart extends Component<{ flights?: Array<Flight>, filters?: Filters, airlines?: Array<Airline> }> {
    static defaultProps = {
        flights: [],
        filters: {},
        airlines: [],
    };

    render() {

        const { flights, filters, airlines } = this.props;

        // TODO: add timeliness filter
        const filteredFlights = flights.filter((f) =>
            filters.airlines.has(f.airlineCode) &&
            (!filters.timelyOnly || f.statistics.timeliness >= 0  )
        );

        filteredFlights.sort(function(a, b) {
            switch (filters.sortBy) {
                case 'departure':
                    return moment(a.departure).valueOf() - moment(b.departure).valueOf();
                case 'arrival':
                    return moment(b.arrival).valueOf() - moment(a.arrival).valueOf();
                case 'duration':
                    return a.duration - b.duration;
                case 'timeliness':
                    return b.statistics.timeliness - a.statistics.timeliness;
                default:
                    return 0;
            }

        });

        const minutesInADay = 1440;

        const flightList = filteredFlights.map((flight, index) => {
            const width = ((flight.duration / minutesInADay) * 100) + '%';
            const departure = moment(flight.departure);
            const midnight = departure.clone().startOf('day');
            const startMinutes = departure.diff(midnight, 'minutes');
            const marginLeft = ((startMinutes / minutesInADay) * 100) + '%';
            const airline = airlines.filter((a) => a.code === flight.airlineCode)[0];

            return (
                <Row key={`${index}-${flight.airlineCode}-${flight.number}`} className="flighRow">
                    <div
                        className="flightBar"
                        style={{ width, marginLeft }}
                    >
                        {flight.airlineCode}{flight.number}
                        <FlightDetails flight={flight} airline={airline}/>
                    </div>
                </Row>
            );
        });

        // TODO: enhance using an advanced Gantt chart component
        // TODO: display the time scale dynamically (according to the flights on screen)

        return (
            <section className="flightsWrapper">
                <Grid>
                    {flightList.length > 0 &&
                       <div>
                           <Row>
                               <Col xs>
                                   0 am
                               </Col>
                               <Col xs>
                                   3 am
                               </Col>
                               <Col xs>
                                   6 am
                               </Col>
                               <Col xs>
                                   9 am
                               </Col>
                               <Col xs>
                                   12 m
                               </Col>
                               <Col xs>
                                   3 pm
                               </Col>
                               <Col xs>
                                   6 pm
                               </Col>
                               <Col xs>
                                   9 pm
                               </Col>
                            </Row>
                            <Row>
                                <Col xs>
                                    <div className="flightsTimeLine">
                                        <div className="arrow-right" />
                                    </div>
                                </Col>
                            </Row>
                       </div>
                    }
                    {flightList}
                    {flightList.length === 0 &&
                        <Row>
                            No Flights match this criteria.
                        </Row>
                    }
                </Grid>
            </section>
        );
    }
}

export default connect(mapStateToProps)(FlightChart);
