// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { RootState, SortType, Airline } from '../state/state';
import * as actions from '../state/actions';
import { Row, Col } from 'react-flexbox-grid';


const mapStateToProps = (state: RootState) => {
    return {
        origin: state.filters.origin,
        destination:  state.filters.destination,
        sortBy: state.filters.sortBy,
        airlines: state.airlines,
    };
};

class FilterBar extends Component<{ origin?: String, destination?: String, sortBy: SortType, airlines?: Array<Airline> } > {
    static defaultProps = {
        origin: null,
        destination: null,
        airlines: [],
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
        const {sortBy, airlines, origin, destination } = this.props;

        const airlinesFilter = airlines.map((airline) =>
            (<li key={airline.code}>
                <label><input type="checkbox" defaultChecked onChange={(e) => this.onAirlineFilterChange(airline.code, e.target.checked)} />{airline.name}</label>
            </li>)
        );

        return (
            <aside>
                {(origin || destination) &&
                <Row start="xs">
                    <Col xs>
                        <button type="button" className={sortBy === 'departure' ? 'selected-sort' : ''} onClick={() => this.onSortChange('departure')}>Departure</button>
                        <button type="button" className={sortBy === 'arrival' ? 'selected-sort' : ''} onClick={() => this.onSortChange('arrival')}>Arrival</button>
                        <button type="button" className={sortBy === 'duration' ? 'selected-sort' : ''} onClick={() => this.onSortChange('duration')}>Duration</button>
                    </Col>
                    <Col xs>
                        <Row end="xs">
                            <Col>
                                <div className="checkbox-group">
                                    <ul>
                                        {airlinesFilter}
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                   </Row>
                }
            </aside>
        );
    }
}

export default connect(mapStateToProps)(FilterBar);
