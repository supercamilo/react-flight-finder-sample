// @flow

import React, { Component } from 'react';
import type { Flight, Airline } from '../state/state';
import { Grid, Row, Col } from 'react-flexbox-grid';
import moment from 'moment';

class FlightChart extends Component<{ flight: Flight, airline: Airline }> {
    getDailyAverageDelays = () => {
        const { flight } = this.props;
        let dailyAverages = {
            max: 0,
        };
        Object.keys(flight.statistics.delays).forEach(function(key) {
            dailyAverages[key] = Number(flight.statistics.delays[key] / flight.statistics.flightCounts[key]);
            if (dailyAverages[key] > dailyAverages.max) {
                dailyAverages.max = dailyAverages[key];
            }
        });
        return dailyAverages;
    };

    render() {
        const { flight, airline } = this.props;

        const departure = moment(flight.departure);
        const arrival = moment(flight.arrival);
        const averageSpeed = Number(flight.averageSpeed).toFixed(0);
        const duration = moment.duration(arrival.diff(departure));
        const averageDelay = flight.statistics && Number(flight.statistics.delays.total / flight.statistics.flightCounts.total).toFixed(0);
        const dailyAverages = this.getDailyAverageDelays();

        return (
            <div className="flightDetails">
                <Row>
                    <Col xs={6}>
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
                    <Col xs={6}>
                        <Grid className="delayGraphWrapper">
                            <Row center="xs">
                                <Col xs className="delayGraphTitle">
                                    Delays
                                </Col>
                            </Row>
                            <Row center="xs" className="delayBarWrapper">
                                <Col xs>
                                    <div className="delayBar" style={{ height: `${((dailyAverages.monday / dailyAverages.max) * 100)}%` }} />
                                </Col>
                                <Col xs>
                                    <div className="delayBar" style={{ height: `${((dailyAverages.tuesday / dailyAverages.max) * 100)}%` }} />
                                </Col>
                                <Col xs>
                                    <div className="delayBar" style={{ height: `${((dailyAverages.wednesday / dailyAverages.max) * 100)}%` }} />
                                </Col>
                                <Col xs>
                                    <div className="delayBar" style={{ height: `${((dailyAverages.thursday / dailyAverages.max) * 100)}%` }} />
                                </Col>
                                <Col xs>
                                    <div className="delayBar" style={{ height: `${((dailyAverages.friday / dailyAverages.max) * 100)}%` }} />
                                </Col>
                                <Col xs>
                                    <div className="delayBar" style={{ height: `${((dailyAverages.saturday / dailyAverages.max) * 100)}%` }} />
                                </Col>
                                <Col xs>
                                    <div className="delayBar" style={{ height: `${((dailyAverages.sunday / dailyAverages.max) * 100)}%` }} />
                                </Col>
                            </Row>
                            <Row left="xs">
                                <Col xs>
                                    Mon
                                </Col>
                                <Col xs>
                                    Tue
                                </Col>
                                <Col xs>
                                    Wed
                                </Col>
                                <Col xs>
                                    Thu
                                </Col>
                                <Col xs>
                                    Fri
                                </Col>
                                <Col xs>
                                    Sat
                                </Col>
                                <Col xs>
                                    Sun
                                </Col>
                            </Row>
                        </Grid>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default FlightChart;
