// @flow

import type { Airport, Flight, Airline } from '../state/state';
import { csv } from 'd3-fetch';

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
                const flight: Flight = {
                    number: Number(d['FL_NUM']),
                    airlineCode: d['UNIQUE_CARRIER'],
                    origin: d['ORIGIN'],
                    destination: d['DEST'],
                    departure: Number(d['DEP_TIME']),
                    arrival: Number(d['ARR_TIME']),
                    distance: Number(d['DISTANCE']),
                };

                // TODO: verify this formula and take date and maybe timezone into account
                flight.duration = flight.arrival - flight.departure;
                flight.averageSpeed = flight.distance / flight.duration;

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
