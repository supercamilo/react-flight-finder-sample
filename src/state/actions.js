// @flow

import { api } from '../server';

const Airports = {
    FETCH_AIRPORTS: 'FETCH_AIRPORTS',
    REFRESH_AIRPORTS: 'REFRESH_AIRPORTS',
    fetch: (searchTerm: String, type: AirportType) => {
        return function (dispatch): any {
            dispatch({
                type: Airports.FETCH_AIRPORTS,
            });
            return api.fetchAirports(searchTerm).then((airports) => {
                dispatch({
                    type: Airports.REFRESH_AIRPORTS,
                    airportType: type,
                    airports,
                });
            });
        };
    },
};

export {
    Airports,
};
