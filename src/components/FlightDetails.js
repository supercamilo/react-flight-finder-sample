// @flow

import React, { Component } from 'react';
import type { Flight, Airline } from '../state/state';
import { Grid, Row, Col } from 'react-flexbox-grid';
import moment from 'moment';

class FlightChart extends Component<{ flight: Flight, airline: Airline }> {
    render() {
        const { flight, airline } = this.props;

        const departure = moment(flight.departure);
        const arrival = moment(flight.arrival);
        const averageSpeed = Number(flight.averageSpeed).toFixed(0);
        const duration = moment.duration(arrival.diff(departure));
        const averageDelay = flight.statistics && Number(flight.statistics.delays.total / flight.statistics.flightCount).toFixed(0);

        return (
            <div className="flightDetails">
                <Col xs>
                    <strong><h3>{`${airline.name} ${flight.number}`}</h3></strong>
                    <br />
                    {flight.origin}<strong>&nbsp;&#8594;&nbsp;</strong>{flight.destination}
                    <br />
                    {`${departure.format('HH:mma')}   ${arrival.format('HH:mma')}`}
                    <br />
                    {`${duration.hours()}h ${duration.minutes()}m`}
                    <br />
                    {`${flight.distance}mi`}
                    <br />
                    {`${averageSpeed}mph`}
                    <br />
                    {`Average delay ${averageDelay}m`}
                    <br />
                    {`Cancellations ${flight.statistics.cancellations}`}
                </Col>
                <Col xs>
                    <Grid>
                        <Row center="xs">
                            <Col xs>
                                delays
                            </Col>
                        </Row>
                    </Grid>
                </Col>
            </div>
        );
    }
}

export default FlightChart;
