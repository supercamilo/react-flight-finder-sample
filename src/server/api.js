// @flow

import type { Airport } from '../state/index';
import { csv } from 'd3-fetch';

async function fetchAirports(): Promise<Array<Airport>> {
    const resp = await csv(`${process.env.PUBLIC_URL}/2015-AA-UA-DL-flights.csv`).then(function(data) {
        // TODO: filter airports by search term
    });
    return resp;
}

export {
    fetchAirports,
};
