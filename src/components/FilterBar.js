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
        sortBy: state.filters.sortBy,
        airlines: state.airlines,
    };
};

class Header extends Component<{ originAirports: Array<Airport>, destinationAirports: Array<Airport>, sortBy: SortType }
    , { originSearchTerm: String, destinationSearchTem: String }> {
    constructor(props) {
        super(props);
        this.state = {
            originSearchTerm: '',
            destinationSearchTem: '',
        };
    }

    onOriginChange = (searchTerm: String) => {
        this.setState({ originSearchTerm: searchTerm })

        const { dispatch } = this.props;
        dispatch(actions.Airports.fetch(searchTerm, 'origin'));
    };

    onOriginSelect = (code: String) => {
        const { originAirports, dispatch } = this.props;

        const airport = originAirports.filter(a => a.code === code)[0];

        this.setState({ originSearchTerm: `${airport.code} - ${airport.city}` })
        dispatch(actions.Filters.selectAirport(code, 'origin'));
    };

    onDestinationChange = (searchTerm: String) => {
        this.setState({ destinationSearchTem: searchTerm })

        const { dispatch } = this.props;
        dispatch(actions.Airports.fetch(searchTerm, 'destination'));
    };

    onDestinationSelect = (code: String) => {
        const { destinationAirports, dispatch } = this.props;

        const airport = destinationAirports.filter(a => a.code === code)[0];

        this.setState({ destinationSearchTem: `${airport.code} - ${airport.city}` })
        dispatch(actions.Filters.selectAirport(code, 'destination'));
    };

    onSortChange = (sortBy: SortType) => {
        const { dispatch } = this.props;
        dispatch(actions.Filters.changeSort(sortBy));
    };

    render() {
        const { originSearchTerm, destinationSearchTem } = this.state;
        const { originAirports, destinationAirports, sortBy, airlines } = this.props;

        const airlinesFilter = airlines.map((airline) =>
            <li><input type="checkbox">{airline.name}</input></li>
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
                    />
                </Row>
                <Row>
                    <Col>
                        <button type="button" className={sortBy === 'departure' ? 'selected-sort' : ''} onClick={() => this.onSortChange('departure')}>Departure</button>
                        <button type="button" className={sortBy === 'arrival' ? 'selected-sort' : ''} onClick={() => this.onSortChange('arrival')}>Arrival</button>
                        <button type="button" className={sortBy === 'duration' ? 'selected-sort' : ''} onClick={() => this.onSortChange('duration')}>Duration</button>
                    </Col>
                    <Col>
                        <ul class="checkbox-group">
                            {airlinesFilter}
                        </ul>
                    </Col>
                   </Row>
            </aside>
        );
    }
}

export default connect(mapStateToProps)(Header);
