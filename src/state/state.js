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
    airportCode: String,
    departure: Number,
    arrival: Number,
    length: Number,
    distance: Number,
    averageSpeed: Number,
};

type SortType = 'departure' | 'arrival' | 'duration';

type RootState = {
    airports: {
        origin: Array<Airport>,
        destination: Array<Airport>,
    },
    airlines: Array<Airline>,
    flights: Array<Flight>,
    filters: {
        origin: Airport,
        destination: Airport,
        sortBy: SortType,
        airlines: [],
    },
};

const initialState: RootState = {
    airports: {
        origin: [],
        destination: [],
    },
    airlines: [],
    flights: [],
    filters: {
        origin: {},
        destination: {},
        sortBy: 'departure',
        airlines: [],
    },
};

export type {
    Airport,
    AirportType,
    Airline,
    Flight,
    RootState,
};

export interface Store {
    dispatch({type: String}): void,
    getState(): any,
}

export {
    initialState,
};
