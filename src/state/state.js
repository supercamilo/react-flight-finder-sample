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
    departure: Date,
    arrival: Date,
    duration: Number,
    distance: Number,
    averageSpeed: Number,
    statistics: {
        flightCount: Number,
        cancellations: Number,
        diverts: Number,
        delays: {
            monday: Number,
            tuesday: Number,
            wednesday: Number,
            thursday: Number,
            friday: Number,
            saturday: Number,
            sunday: Number,
            total: Number,
        },
        timeliness: Number,
    }
};

type SortType = 'departure' | 'arrival' | 'duration' | 'timeliness';

type Filters = {
    origin: String,
    destination: String,
    sortBy: SortType,
    airlines?: Set<String>,
    timelyOnly: Boolean,
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
        airlines: new Set(),
        timelyOnly: false,
    },
};

export type {
    Airport,
    AirportType,
    Airline,
    Flight,
    SortType,
    Filters,
    RootState,
};

export interface Store {
    dispatch({type: String}): void,
    getState(): any,
}

export {
    initialState,
};
