// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Autocomplete } from './';
import type { RootState, Airport, SortType } from '../state/state';
import * as actions from '../state/actions';
import { Row, Col } from 'react-flexbox-grid';


const mapStateToProps = (state: RootState) => {
    return {
        originAirports: state.airports.origin,
        destinationAirports: state.airports.destination,
        origin: state.filters.origin,
        destination:  state.filters.destination,
        sortBy: state.filters.sortBy,
        airlines: state.airlines,
    };
};

class Header extends Component<{ originAirports: Array<Airport>, destinationAirports: Array<Airport>, origin?: Airport, destination?: Airport, sortBy: SortType }
    , { originSearchTerm: String, destinationSearchTem: String }> {
    static defaultProps = {
        origin: null,
        destination: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            originSearchTerm: '',
            destinationSearchTem: '',
        };
    }

    onOriginChange = (searchTerm: String) => {
        this.setState({ originSearchTerm: searchTerm })

        const { destination, dispatch } = this.props;
        dispatch(actions.Airports.fetchOrigin(searchTerm, destination));
    };

    onOriginSelect = (code: String) => {
        const { originAirports, destination, dispatch } = this.props;

        const airport = originAirports.filter(a => a.code === code)[0];

        this.setState({ originSearchTerm: `${airport.code} - ${airport.city}` })
        dispatch(actions.Filters.selectOrigin(code, destination));
    };

    onDestinationChange = (searchTerm: String) => {
        this.setState({ destinationSearchTem: searchTerm })

        const { origin, dispatch } = this.props;
        dispatch(actions.Airports.fetchDestination(searchTerm, origin));
    };

    onDestinationSelect = (code: String) => {
        const { destinationAirports, origin, dispatch } = this.props;

        const airport = destinationAirports.filter(a => a.code === code)[0];

        this.setState({ destinationSearchTem: `${airport.code} - ${airport.city}` })
        dispatch(actions.Filters.selectDestination(origin, code));
    };

    onSortChange = (sortBy: SortType) => {
        const { dispatch } = this.props;
        dispatch(actions.Filters.changeSort(sortBy));
    };

    onAirlineFilterChange = (code: String, value: Boolean) => {
        const { dispatch } = this.props;
        dispatch(actions.Filters.changeAirlineFilter(code, value));
    };

    render() {
        const { originSearchTerm, destinationSearchTem } = this.state;
        const { originAirports, destinationAirports, sortBy, airlines } = this.props;

        const airlinesFilter = airlines.map((airline) =>
            (<li>
                <input type="checkbox" defaultChecked onChange={(e) => this.onAirlineFilterChange(airline.code, e.target.checked)} />{airline.name}
            </li>)
        );

        return (
            <aside>
                <Row>
                    <Autocomplete
                        getItemValue={(item) => item.code}
                        items={originAirports}
                        renderItem={(item, isHighlighted) =>
                            <div key={item.code} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                {`${item.code} - ${item.city}`}
                            </div>
                        }
                        value={originSearchTerm}
                        onChange={(e) => this.onOriginChange(e.target.value, 'origin')}
                        onSelect={(value) => this.onOriginSelect(value, 'destination')}
                        inputProps={{ placeholder: 'From – City or Airport' }}
                    />
                    <Autocomplete
                        getItemValue={(item) => item.code}
                        items={destinationAirports}
                        renderItem={(item, isHighlighted) =>
                            <div key={item.code} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                {`${item.code} - ${item.city}`}
                            </div>
                        }
                        value={destinationSearchTem}
                        onChange={(e) => this.onDestinationChange(e.target.value, 'destination')}
                        onSelect={(value) => this.onDestinationSelect(value, 'destination')}
                        inputProps={{ placeholder: 'To – City or Airport' }}
                    />
                </Row>
                <Row>
                    <Col>
                        <button type="button" className={sortBy === 'departure' ? 'selected-sort' : ''} onClick={() => this.onSortChange('departure')}>Departure</button>
                        <button type="button" className={sortBy === 'arrival' ? 'selected-sort' : ''} onClick={() => this.onSortChange('arrival')}>Arrival</button>
                        <button type="button" className={sortBy === 'duration' ? 'selected-sort' : ''} onClick={() => this.onSortChange('duration')}>Duration</button>
                    </Col>
                    <Col>
                        <ul className="checkbox-group">
                            {airlinesFilter}
                        </ul>
                    </Col>
                   </Row>
            </aside>
        );
    }
}

export default connect(mapStateToProps)(Header);
