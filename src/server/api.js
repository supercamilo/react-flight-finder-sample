// @flow

import type { Airport } from '../state/index';
import { csv } from 'd3-fetch';

async function fetchAirports(searchTerm: String, airportType, counterpartCode: String): Promise<Array<Airport>> {
    const keys = [];
    const resp = await csv(`${process.env.PUBLIC_URL}/2015-AA-UA-DL-flights.csv`,
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
                (airport.code.includes(searchTerm.toUpperCase())
            || airport.city.toUpperCase().includes(searchTerm.toUpperCase()))) {
                keys.push(airport.code);
                return airport;
            }
        }
    );
    return resp;
}

async function fetchFlights(searchTerm: String): Promise<Array<Airport>> {
    const keys = [];
    const resp = await csv(`${process.env.PUBLIC_URL}/2015-AA-UA-DL-flights.csv`,
        function (d) {
            const airport: Airport = {
                code: d.ORIGIN.trim().toUpperCase(),
                city: d.ORIGIN_CITY_NAME.trim(),
                state: d.ORIGIN_STATE_ABR.trim().toUpperCase(),
            };


            if (!keys.includes(airport.code) &&
                (airport.code.includes(searchTerm.toUpperCase())
                    || airport.city.toUpperCase().includes(searchTerm.toUpperCase()))) {
                keys.push(airport.code);
                return airport;
            }
        }
    );
    return resp;
}

export {
    fetchAirports,
};
