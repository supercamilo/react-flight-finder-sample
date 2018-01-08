// @flow

import { api } from '../server';
import type { AirportType, SortType } from './state';

const Airports = {
    FETCH_AIRPORTS: 'FETCH_AIRPORTS',
    REFRESH_AIRPORTS: 'REFRESH_AIRPORTS',
    fetch: (searchTerm: String, airportType: AirportType, counterpartCode: String) => {
        return function (dispatch): any {
            dispatch({
                type: Airports.FETCH_AIRPORTS,
            });
            return api.fetchAirports(searchTerm, airportType, counterpartCode).then((airports) => {
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
    CHANGE_SORT: 'CHANGE_SORT',
    selectAirport: (code: String, airportType: AirportType) => {
        return function (dispatch): any {
            dispatch({
                type: Filters.SELECT_AIRPORT,
                airportType,
                code,
            });
            // return api.fetchFlights(searchTerm).then((airports) => {
            //     dispatch({
            //         type: Airports.REFRESH_AIRPORTS,
            //         airportType,
            //         airports,
            //     });
            // });
        };
    },
    changeSort: (sortBy: SortType) => {
        return function (dispatch): any {
            dispatch({
                type: Filters.CHANGE_SORT,
                sortBy,
            });
        };
    },
};


export {
    Airports,
    Filters,
};
