// @flow

type Airport = {
    code: String,
    city: String,
    state: String,
};

type AirportType = 'origin' | 'destination';

type Airline = {
    code: String,
    name: String,
};

type Flight = {
    number: Number,
    airlineCode: String,
    origin: String,
    destination: String,
    departure: Number,
    arrival: Number,
    length: Number,
    distance: Number,
    averageSpeed: Number,
};

type SortType = 'departure' | 'arrival' | 'duration';

type Filters = {
    origin: String,
    destination: String,
    sortBy: SortType,
    airlines: Array<String>,
};

type RootState = {
    airports: {
        origin: Array<Airport>,
        destination: Array<Airport>,
    },
    airlines: Array<Airline>,
    flights: Array<Flight>,
    filters: Filters,
};

const initialState: RootState = {
    airports: {
        origin: [],
        destination: [],
    },
    airlines: [],
    flights: [],
    filters: {
        origin: null,
        destination: null,
        sortBy: 'departure',
        airlines: [],
    },
};

export type {
    Airport,
    AirportType,
    Airline,
    Flight,
    SortType,
    RootState,
};

export interface Store {
    dispatch({type: String}): void,
    getState(): any,
}

export {
    initialState,
};
