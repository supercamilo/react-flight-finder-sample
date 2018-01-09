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
    const resp = await csv(`${process.env.PUBLIC_URL}/data/2015-AA-UA-DL-flights.csv`,
        function (d) {
            if ((origin || destination) && // at least one to filter
                (!origin || d['ORIGIN'] === origin) &&
                (!destination || d['DEST'] === destination)
            ) {
                const departure = d['DEP_TIME'].padStart(4, '0');
                const departureMmt = moment(`${d['FL_DATE']} ${departure.substring(0, 2)}:${departure.substring(2, 4)}:00`);
                const arrival = d['ARR_TIME'].padStart(4, '0');
                const arrivalMmt = moment(`${d['FL_DATE']} ${arrival.substring(0, 2)}:${arrival.substring(2, 4)}:00`);

                const flight: Flight = {
                    number: Number(d['FL_NUM']),
                    airlineCode: d['UNIQUE_CARRIER'],
                    origin: d['ORIGIN'],
                    destination: d['DEST'],
                    departure: departureMmt.toDate(),
                    arrival: arrivalMmt.toDate(),
                    distance: Number(d['DISTANCE']),
                };

                // TODO: process flights ending the next day
                flight.duration = arrivalMmt.diff(departureMmt, 'minutes');
                flight.averageSpeed = (flight.distance / flight.duration) * 60;

                return flight;
            }
        }
    );
    return resp;
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
};
