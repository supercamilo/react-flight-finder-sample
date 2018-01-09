// @flow

import { combineReducers } from 'redux';
import * as actions from './actions';
import { initialState } from './state';
import type { RootState, Airport, Airline, Flight } from './state';

const initialAirportsState = initialState.airports;

const airportsReducer = (state: RootState.airports = initialAirportsState, action: Object): Array<Airport> => {
    let nextState : ?Array<Airport>;

    switch (action.type) {
        case actions.Airports.REFRESH_ORIGIN:
            nextState = { ...state, origin: action.airports };
            break;
        case actions.Airports.REFRESH_DESTINATION:
            nextState = { ...state, destination: action.airports };
            break;
        default:
    }

    return nextState || state;
};

const initialAirlinesState = initialState.airlines;

const airlinesReducer = (state: RootState.airlines = initialAirlinesState, action: Object): Array<Airline> => {
    let nextState : ?Array<Airline>;

    switch (action.type) {
        case actions.Airlines.REFRESH_AIRLINES:
            nextState = action.airlines;
            break;
        default:
    }

    return nextState || state;
};

const initialFlightsState = initialState.flights;

const flightsReducer = (state: RootState.flights = initialFlightsState, action: Object): Array<Flight> => {
    let nextState : ?Array<Flight>;

    switch (action.type) {
        case actions.Flights.REFRESH_FLIGHTS:
            nextState = action.flights;
            break;
        default:
    }

    return nextState || state;
};

const initialFiltersState = initialState.filters;

const filtersReducer = (state: RootState.filters = initialFiltersState, action: Object): Array<Object> => {
    let nextState : ?Array<Object>;

    switch (action.type) {
        case actions.Filters.SELECT_ORIGIN:
            nextState = { ...state, origin: action.origin };
            break;
        case actions.Filters.SELECT_DESTINATION:
            nextState = { ...state, destination: action.destination };
            break;
        case actions.Filters.CHANGE_SORT:
            nextState = { ...state, sortBy: action.sortBy };
            break;
        case actions.Airlines.REFRESH_AIRLINES:
            nextState = { ...state, airlines: new Set(action.airlines.map(a => a.code)) };
            break;
        case actions.Filters.ADD_AIRLINE_FILTER:
            nextState = { ...state };
            nextState.airlines.add(action.code);
            break;
        case actions.Filters.REMOVE_AIRLINE_FILTER:
            nextState = { ...state };
            nextState.airlines.delete(action.code);
            break;
        case actions.Filters.CHANGE_TIMELY_FILTER:
            nextState = { ...state, timelyOnly: action.value };
            break;
        default:
    }

    return nextState || state;
};

const reducers = combineReducers({
    airports: airportsReducer,
    airlines: airlinesReducer,
    flights: flightsReducer,
    filters: filtersReducer,

});

export default reducers;