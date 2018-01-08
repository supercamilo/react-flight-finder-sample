// @flow

import { api } from '../server';
import type { AirportType } from './state';

const Airports = {
    FETCH_AIRPORTS: 'FETCH_AIRPORTS',
    REFRESH_AIRPORTS: 'REFRESH_AIRPORTS',
    SELECT_AIRPORT: 'SELECT_AIRPORT',
    fetch: (searchTerm: String, airportType: AirportType) => {
        return function (dispatch): any {
            dispatch({
                type: Airports.FETCH_AIRPORTS,
            });
            return api.fetchAirports(searchTerm).then((airports) => {
                dispatch({
                    type: Airports.REFRESH_AIRPORTS,
                    airportType,
                    airports,
                });
            });
        };
    },
};


const Filters = {
    SELECT_AIRPORT: 'SELECT_AIRPORT',
    selectAirport: (code: String, airportType: AirportType) => {
        return function (dispatch): any {
            dispatch({
                type: Airports.SELECT_AIRPORT,
                airportType,
                code,
            });
        };
    },
};


export {
    Airports,
    Filters,
};
