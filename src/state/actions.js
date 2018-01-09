// @flow

import { api } from '../server';
import type { SortType } from './state';

const Airports = {
    REFRESH_ORIGIN: 'REFRESH_ORIGIN',
    REFRESH_DESTINATION: 'REFRESH_DESTINATION',
    fetchOrigin: (searchTerm: String, destination: String) => {
        return function (dispatch): any {
            return api.fetchAirports(searchTerm, 'origin', destination).then((airports) => {
                dispatch({
                    type: Airports.REFRESH_ORIGIN,
                    airports,
                });
            });
        };
    },
    fetchDestination: (searchTerm: String, origin: String) => {
        return function (dispatch): any {
            return api.fetchAirports(searchTerm, 'destination', origin).then((airports) => {
                dispatch({
                    type: Airports.REFRESH_DESTINATION,
                    airports,
                });
            });
        };
    },
};


const Filters = {
    SELECT_ORIGIN: 'SELECT_ORIGIN',
    SELECT_DESTINATION: 'SELECT_DESTINATION',
    CHANGE_SORT: 'CHANGE_SORT',
    selectOrigin: (origin: String, destination: String) => {
        return function (dispatch): any {
            dispatch({
                type: Filters.SELECT_ORIGIN,
                origin,
            });
            return Filters.selectAirports(dispatch, origin, destination);
        };
    },
    selectDestination: (origin: String, destination: String) => {
        return function (dispatch): any {
            dispatch({
                type: Filters.SELECT_DESTINATION,
                destination,
            });
            return Filters.selectAirports(dispatch, origin, destination);
        };
    },
    selectAirports: (dispatch: any, origin: String, destination: String) => {
        return Flights.fetchFlights(dispatch, origin, destination);
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

const Flights = {
    REFRESH_FLIGHTS: 'REFRESH_FLIGHTS',
    fetchFlights: (dispatch: any, origin: String, destination: String) => {
        return api.fetchFlights(origin, destination).then((flights) => {
            dispatch({
                type: Flights.REFRESH_FLIGHTS,
                flights,
            });
        });
    },
};


export {
    Airports,
    Filters,
    Flights,
};
