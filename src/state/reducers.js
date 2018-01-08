// @flow

import { combineReducers } from 'redux';
import * as actions from './actions';
import { initialState } from './state';
import type { RootState, Airport, Airline, Flight } from './state';

const initialAirportsState = initialState.airports;

const airportsReducer = (state: RootState.airports = initialAirportsState, action: Object): Array<Airport> => {
    let nextState : ?Array<Airport>;

    switch (action.type) {
        case actions.Airports.FETCH_AIRPORTS:
            nextState = { ...state, isFetching: true };
            break;
        case actions.Airports.REFRESH_AIRPORTS:
            nextState = { ...state, items: action.airports, isFetching: false };
            break;
        default:
    }

    return nextState || state;
};

const initialAirlinesState = initialState.airlines;

const airlinesReducer = (state: RootState.airlines = initialAirlinesState, action: Object): Array<Airline> => {
    let nextState : ?Array<Airline>;

    return nextState || state;
};

const initialFlightsState = initialState.flights;

const fligthsReducer = (state: RootState.flights = initialFlightsState, action: Object): Array<Flight> => {
    let nextState : ?Array<Flight>;

    return nextState || state;
};

const initialFiltersState = initialState.filters;

const filtersReducer = (state: RootState.filters = initialFiltersState, action: Object): Array<Object> => {
    let nextState : ?Array<Object>;

    return nextState || state;
};

const reducers = combineReducers({
    airports: airportsReducer,
    airlines: airlinesReducer,
    flights: fligthsReducer,
    filters: filtersReducer,

});

export default reducers;