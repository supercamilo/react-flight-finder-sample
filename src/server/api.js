// @flow

import type { Airport, Flight, Airline } from '../state/state';
import { csv } from 'd3-fetch';
import moment from 'moment';

async function fetchAirports(searchTerm: String, airportType, counterpartCode: String): Promise<Array<Airport>> {
    const keys = [];
    const resp = await csv(`${process.env.PUBLIC_URL}/data/2015-AA-UA-DL-flights.csv`,
        function (d) {
            const airportPrefix = airportType === 'origin' ? 'ORIGIN' : 'DEST';
            const counterpartPrefix = airportType === 'origin' ? 'DEST' : 'ORIGIN';

            const airport: Airport = {
                code: d[airportPrefix].trim().toUpperCase(),
                city: d[`${airportPrefix}_CITY_NAME`].trim(),
                state: d[`${airportPrefix}_STATE_ABR`].trim().toUpperCase(),
            };

            if (!keys.includes(airport.code) &&
                (!counterpartCode || d[counterpartPrefix].trim().toUpperCase() === counterpartCode) &&
                (airport.code.includes(searchTerm.toUpperCase()) || airport.city.toUpperCase().includes(searchTerm.toUpperCase()))) {
                keys.push(airport.code);
                return airport;
            }
        }
    );
    return resp;
}

async function fetchFlights(origin: String, destination: String): Promise<Array<Flight>> {
    const resp = await csv(
        `${process.env.PUBLIC_URL}/data/2015-AA-UA-DL-flights.csv`,
        function (data) {
            if ((origin || destination) && // at least one to filter
                (!origin || data['ORIGIN'] === origin) &&
                (!destination || data['DEST'] === destination)
            ) {
                const departure = data['DEP_TIME'].padStart(4, '0');
                const departureMmt = moment(`${data['FL_DATE']} ${departure.substring(0, 2)}:${departure.substring(2, 4)}:00`);
                const arrival = data['ARR_TIME'].padStart(4, '0');
                const arrivalMmt = moment(`${data['FL_DATE']} ${arrival.substring(0, 2)}:${arrival.substring(2, 4)}:00`);

                const flight: Flight = {
                    number: Number(data['FL_NUM']),
                    airlineCode: data['UNIQUE_CARRIER'],
                    origin: data['ORIGIN'],
                    destination: data['DEST'],
                    departure: departureMmt.toDate(),
                    arrival: arrivalMmt.toDate(),
                    distance: Number(data['DISTANCE']),
                    statistics: {
                        flightCounts: {
                            monday: 0,
                            tuesday: 0,
                            wednesday: 0,
                            thursday: 0,
                            friday: 0,
                            saturday: 0,
                            sunday: 0,
                            total: 0,
                        },
                        cancellations: 0,
                        diverts: 0,
                        delays: {
                            monday: 0,
                            tuesday: 0,
                            wednesday: 0,
                            thursday: 0,
                            friday: 0,
                            saturday: 0,
                            sunday: 0,
                            total: 0,
                        },
                        timeliness: 0,
                    },
                };

                // TODO: process flights ending the next day
                flight.duration = arrivalMmt.diff(departureMmt, 'minutes');
                flight.averageSpeed = (flight.distance / flight.duration) * 60;

                return flight;
            }
        },
    );
    return resp;
}

// TODO: make this configurable in the store
const cancelWeight = 5;
const divertWeight = 3;
const delayWeight = 1;

// TODO: process this server-side to improve performance
async function buildFlightStatistics(flights: Array<Flight>): Promise<Array<Flight>> {
    const uniqueflightCodes = new Set(flights.map((f) => f.airlineCode + f.number));
    let flightsWithStatistics = flights;

    await csv(
        `${process.env.PUBLIC_URL}/data/2015-AA-UA-DL-flights.csv`,
        function (data) {
            const code = data['UNIQUE_CARRIER']+data['FL_NUM'];
            if (uniqueflightCodes.has(code)) {
                flightsWithStatistics.forEach(function(f,i) {
                    if (f.airlineCode + f.number === code) {
                        const dayName = moment(data['FL_DATE']).format('dddd').toLowerCase();

                        flightsWithStatistics[i].statistics.flightCounts.total += 1;
                        flightsWithStatistics[i].statistics.flightCounts[dayName] += 1;

                        if (data['CANCELLED'] === '1') {
                            flightsWithStatistics[i].statistics.cancellations += 1;
                        }

                        if (data['DIVERTED'] === '1') {
                            flightsWithStatistics[i].statistics.diverts += 1;
                        }

                        const delay = Number(data['DEP_DELAY']) + Number(data['ARR_DELAY']);
                        flightsWithStatistics[i].statistics.delays[dayName] += delay;
                        flightsWithStatistics[i].statistics.delays.total += delay;

                        const cancelScore = cancelWeight * flightsWithStatistics[i].statistics.cancellations * -1;
                        const divertScore = divertWeight * flightsWithStatistics[i].statistics.diverts * -1;
                        const delayScore = delayWeight * flightsWithStatistics[i].statistics.delays.total * -1;
                        flightsWithStatistics[i].statistics.timeliness = cancelScore + divertScore + delayScore;
                    }
                });
            }
        },
    );

    return flightsWithStatistics;
}

async function fetchAirlines(codes: Array<String>): Promise<Array<Airline>> {
    if (!codes || !Array.isArray(codes) || codes.length < 1) {
        return [];
    }
    const resp = await csv(`${process.env.PUBLIC_URL}/data/airlines.csv`,
        function (d) {
            const airlineFields = d['Description'].toString().split(':');
            const airlineCode = airlineFields[1].trim();
            if (codes.includes(airlineCode)) {
                const airline: Airline = {
                    code: airlineCode,
                    name: airlineFields[0].trim(),
                };

                return airline;
            }
        }
    );
    return resp;
}

export {
    fetchAirports,
    fetchFlights,
    fetchAirlines,
    buildFlightStatistics,
};
